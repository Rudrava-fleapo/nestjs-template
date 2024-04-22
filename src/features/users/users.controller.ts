import { ResponseInterceptor } from '@app/utils/interceptors';
import { tags } from '@app/utils/swagger';
import { Controller, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags(tags.user.name)
@UseInterceptors(ResponseInterceptor)
export class UsersController {}
