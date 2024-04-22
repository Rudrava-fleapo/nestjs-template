import { UserEntity } from '@app/entities';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID as uuid } from 'node:crypto';
import { OTPRepository, UserRepository } from 'src/data/repositories';
import { sanitizePhoneNumber } from 'src/utils/phone-sanitizer';
import { CreateUserDto } from '../users/dto';
import { UsersService } from '../users/users.service';
import { LoginOk, OtpOk } from './dto';
import { JwtUser, TokenType } from './types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly otpRepository: OTPRepository,
    private readonly userService: UsersService,
  ) {}
  private async createToken(userId: string, type: TokenType): Promise<string> {
    const expiresInMap = {
      [TokenType.ACCESS_TOKEN]: '1d',
      [TokenType.REFRESH_TOKEN]: '30d',
    };

    const expiresIn = expiresInMap[type] || '1d';
    const payload = {
      sub: userId,
      jti: uuid(),
      type,
    } satisfies Partial<JwtUser>;
    return this.jwtService.sign(payload, { expiresIn });
  }

  async signup(data: CreateUserDto): Promise<UserEntity> {
    const user = await this.userService.createUser(data);
    return user;
  }

  async getOTP(phoneNumber: string): Promise<OtpOk> {
    const sanitizedNumber = sanitizePhoneNumber(phoneNumber);
    let user = await this.userRepository.findByPhoneNumber(sanitizedNumber);

    if (!user)
      user = await this.userService.createUser({
        phoneNumber: sanitizedNumber,
      });

    await this.otpRepository.createOTP(user);

    return { userId: user.id };
  }

  async login(userId: string, code: string): Promise<LoginOk> {
    const isVerified = await this.otpRepository.verifyOTP(userId, code);
    if (!isVerified) throw new BadRequestException('Invalid OTP');

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found.');
    const [accessToken, refreshToken] = await Promise.all([
      this.createToken(user.id, TokenType.ACCESS_TOKEN),
      this.createToken(user.id, TokenType.REFRESH_TOKEN),
    ]);

    return { userId: user.id, accessToken, refreshToken };
  }
}
