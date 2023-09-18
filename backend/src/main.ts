import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, { cors: true });
  const port = process.env.PORT || 4000;
  const host = process.env.HOST || 'localhost';

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.listen(port, () => {
    Logger.log(`Listening at http://${host}:${port}`);
  });
}
bootstrap();
