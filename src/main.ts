import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './libs';

async function bootstrap(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  swagger.setup(app);
  await app.listen(3000);

  return app;
}
bootstrap();
