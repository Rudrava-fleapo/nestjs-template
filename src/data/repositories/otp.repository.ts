import { OtpEntity, UserEntity } from '@app/entities';
import { Injectable, Logger, Optional } from '@nestjs/common';
import { pbkdf2Sync, randomBytes } from 'node:crypto';
import { OTPGenerator } from 'src/utils';
import { EntityManager, EntityTarget, Repository } from 'typeorm';

@Injectable()
export class OTPRepository extends Repository<OtpEntity> {
  private logger = new Logger(OTPRepository.name);

  constructor(
    @Optional() _target: EntityTarget<OtpEntity>,
    entityManager: EntityManager,
  ) {
    super(OtpEntity, entityManager);
  }

  private processHash(): Record<'salt' | 'hash' | 'code', string> {
    const code = OTPGenerator();
    const salt = randomBytes(16).toString('hex');

    const hash = pbkdf2Sync(code, salt, 1000, 64, `sha512`).toString(`hex`);
    return {
      salt,
      hash,
      code,
    };
  }

  async deleteIfAlreadyOTPExists(userId: string): Promise<void> {
    const otps = await this.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
    if (!otps.length) return;
    await Promise.all(
      otps.map((otp) =>
        this.delete({
          id: otp.id,
        }),
      ),
    );
    this.logger.log(`Deleted all existing OTPS for user with id - ${userId}`);
    return;
  }

  async createOTP(user: UserEntity): Promise<Record<'otpId' | 'code', string>> {
    if (!user) throw new Error('User is required');
    await this.deleteIfAlreadyOTPExists(user.id);
    const { salt, hash, code } = this.processHash();
    const otp = await this.save(
      this.create({
        hash,
        salt,
        user,
      }),
    );
    this.logger.log(`OTP for user - ${user.id} created`);
    return { otpId: otp.id, code };
  }

  async verifyOTP(id: string, code: string): Promise<boolean> {
    const otpData = await this.findOneOrFail({
      where: { user: { id } },
      relations: ['user'],
    });
    const comparingHash = pbkdf2Sync(
      code,
      otpData.salt,
      1000,
      64,
      `sha512`,
    ).toString(`hex`);
    const isValid = comparingHash === otpData.hash;
    if (isValid) this.deleteIfAlreadyOTPExists(otpData.user?.id);
    return isValid;
  }
}
