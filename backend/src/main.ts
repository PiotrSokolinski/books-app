import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

// TODO: B7 - Add proper authentication and authorization
// TODO: B9 - Create own logger service that suits the needs of the application
// TODO: B10 - Add monitoring and alerting
// TODO: B11 - Add caching and optimize queries
// TODO: B12 - Add consistent error handling across all controllers, because we have only one - this was not needed
// TODO: B14 - Perform load testing
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });
  app.enableCors({
    origin: '*',
    exposedHeaders: ['Content-Range'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Books API')
    .setDescription('API for managing books.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
