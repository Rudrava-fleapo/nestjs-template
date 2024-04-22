import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class DatabaseConfig {
  @IsNotEmpty()
  @IsString()
  DATABASE_DATABASE: string;

  @IsNotEmpty()
  @IsString()
  DATABASE_HOST: string;

  @IsNotEmpty()
  @IsString()
  DATABASE_PASSWORD: string;

  @IsNumberString()
  @IsNotEmpty()
  DATABASE_PORT: string;

  @IsNotEmpty()
  @IsString()
  DATABASE_USERNAME: string;
}
