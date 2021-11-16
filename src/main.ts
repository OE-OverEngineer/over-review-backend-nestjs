import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer, Validator } from 'class-validator';
import { AppModule } from './app.module';
import { Container } from 'typedi';
import { UsersUseCases } from './usecases/users.usecase';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
// import { ValidatorModule } from './infrastructure/validators/validator.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  // useContainer(app, { fallback: true });
  // useContainer(Container, { fallbackOnErrors: true });
  // const controllerModule = app.select(ControllersModule);
  // Container.set(UsersUseCases, controllerModule.get(UsersUseCases));
  // const validator = Container.get(Validator);
  // useContainer(Container, { fallback: true });
  // const validator = Container.get(Validator);
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
