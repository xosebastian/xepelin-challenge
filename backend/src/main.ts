import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.listen(4000, () => console.log('Application is listening on port 3000.'));
}
bootstrap();
