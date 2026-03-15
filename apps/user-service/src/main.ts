import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(UserServiceModule);

  const config = new DocumentBuilder()
    .setTitle('User Service')
    .setDescription('The User API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3002);
}
bootstrap();