import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe(
      {
        transform:true,
        whitelist:true,
        forbidNonWhitelisted:true,
      }, 
    ),
  );
  const port = await app.listen(4857);
  logger.warn(`API running in http://localhost:4857`);
}
bootstrap();
