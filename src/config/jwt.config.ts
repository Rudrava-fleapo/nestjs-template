import { IsNotEmpty, IsString } from 'class-validator';

export class JWTConfig {
  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;

  @IsNotEmpty()
  @IsString()
  JWT_ISSUER: string;
}
