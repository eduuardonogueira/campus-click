import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import configuration from './config/configuration';
import { Logger } from '@nestjs/common';

const logger = new Logger('NestApplication');

async function bootstrap() {
  const { port } = configuration();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      // disableErrorMessages: false
    }),
  );

  await app.listen(port);

  logger.log('Backend is alive on: ', await app.getUrl());
}

void bootstrap();
