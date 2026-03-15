import { NestFactory } from '@nestjs/core';
import { PostServiceModule } from './post-service.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(PostServiceModule);

  const config = new DocumentBuilder()
    .setTitle('Post Service')
    .setDescription('The Post API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
 
  await app.listen(3003);
}
bootstrap();