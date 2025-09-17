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

  const url = await app.getUrl();
  logger.log('Backend is alive on: ' + url);

    // faz uma requisição para si mesmo a cada 3 minutos
    setInterval(async () => {
      try {
        const res = await fetch(url);
        logger.log('Keep-alive ping sent to ' + url + ' - status: ' + res.status);
      } catch (err) {
        logger.warn('Keep-alive ping failed: ' + err?.message);
      }
    }, 3 * 60 * 1000); // 3 minutos (180000 ms) tá em milisegundos
}

void bootstrap();
