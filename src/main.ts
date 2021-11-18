import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { ValidatorModule } from './infrastructure/validators/validator.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  useContainer(app.select(ValidatorModule), { fallbackOnErrors: true });
  const config = new DocumentBuilder()
    .setTitle('Over review')
    .setDescription('Over review API description')
    .setVersion('1.0')
    .setBasePath('api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(8000);
}
bootstrap();
