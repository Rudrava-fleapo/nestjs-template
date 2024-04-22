import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UserRepository } from 'src/data/repositories';
import { CreateUserDto } from './dto';
import { UserEntity } from '@app/entities';
import { sanitizePhoneNumber } from 'src/utils/phone-sanitizer';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findByPhoneNumber(data.phoneNumber);
    if (user)
      throw new BadRequestException(
        'User with this phone number already exists.',
      );
    try {
      const userData = this.userRepository.create({
        phoneNumber: sanitizePhoneNumber(data.phoneNumber),
        firstName: data.firstName,
        lastName: data.lastName,
      });
      const user = await this.userRepository.save(userData);
      this.logger.log(`User with id - ${user.id} created.`);
      return user;
    } catch (error) {
      this.logger.error('Error creating user.');
      throw new InternalServerErrorException('Error creating user.');
    }
  }
}
