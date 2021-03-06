import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { json } from 'express';
import { AppModule } from './app.module';
import { ValidatorModule } from './infrastructure/validators/validator.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(json({ limit: '50mb' }));
  app.enableCors();
  useContainer(app.select(ValidatorModule), { fallbackOnErrors: true });
  const config = new DocumentBuilder()
    .setTitle('Over review')
    .setDescription('Over review API Documents Version 1.0.0')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(8000);
}
bootstrap();
