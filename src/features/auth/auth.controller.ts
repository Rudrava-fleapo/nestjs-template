import { ResponseInterceptor } from '@app/utils/interceptors';
import { tags } from '@app/utils/swagger';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GetOTPDto, LoginOk, OtpOk, VerifyOTPDto } from './dto';

@Controller('auth')
@ApiBadRequestResponse()
@ApiInternalServerErrorResponse()
@ApiTags(tags.user.name)
@UseInterceptors(ResponseInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/otp')
  async getOTP(@Body() body: GetOTPDto): Promise<OtpOk> {
    return this.authService.getOTP(body.phoneNumber);
  }

  @Post('/login')
  async login(@Body() body: VerifyOTPDto): Promise<LoginOk> {
    return this.authService.login(body.userId, body.code);
  }
}
