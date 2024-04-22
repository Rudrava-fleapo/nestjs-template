import {
  Injectable,
  InternalServerErrorException,
  Logger,
  Optional,
} from '@nestjs/common';
import { EntityManager, EntityTarget, Repository } from 'typeorm';
import { UserEntity } from '../entities';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  private logger = new Logger(UserRepository.name);

  constructor(
    @Optional() _target: EntityTarget<UserEntity>,
    entityManager: EntityManager,
  ) {
    super(UserEntity, entityManager);
  }

  async findByPhoneNumber(phoneNumber: string): Promise<UserEntity | null> {
    if (!phoneNumber)
      throw new InternalServerErrorException('Phone number is required.');

    const user = await this.findOne({
      where: {
        phoneNumber,
      },
    });

    return user;
  }
  async findByPhoneNumberOrFail(phoneNumber: string): Promise<UserEntity> {
    const user = await this.findByPhoneNumber(phoneNumber);
    if (!user) throw new Error('User not found.');
    return user;
  }
}
