import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './utils';
import { EnvValidations } from './config';
import { DataModule } from './data/data.module';
import { UsersModule } from './features/users/users.module';
import { AuthModule } from './features/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => validateEnv(config, EnvValidations),
    }),
    DataModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
