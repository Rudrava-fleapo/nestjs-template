import { IntersectionType } from '@nestjs/swagger';
import { DatabaseConfig } from './db.config';
import { JWTConfig } from './jwt.config';
import { IsString } from 'class-validator';

export class EnvValidations extends IntersectionType(
  DatabaseConfig,
  JWTConfig,
) {
  @IsString()
  NODE_ENV: 'local' | 'staging' | 'production';
}
