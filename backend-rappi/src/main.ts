import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 1. Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('Rappi-Clone API') // Título de tu proyecto
    .setDescription('Documentación de la API para el proyecto Rappi-Clone.')
    .setVersion('1.0')
    .addBearerAuth() // Si usas JWT, esto añade el campo para el token
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
