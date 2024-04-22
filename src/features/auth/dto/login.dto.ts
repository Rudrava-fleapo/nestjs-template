import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginOk {
  @ApiProperty()
  @IsString()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @IsString()
  refreshToken: string;
}
export class OtpOk {
  @ApiProperty()
  @IsString()
  @IsUUID()
  userId: string;
}

export class GetOTPDto {
  @IsPhoneNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  phoneNumber: string;
}

export class VerifyOTPDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsUUID()
  userId: string;

  @ApiProperty({
    maxLength: 6,
    minLength: 6,
    required: true,
  })
  @MinLength(6)
  @MaxLength(6)
  @IsString()
  code: string;
}
