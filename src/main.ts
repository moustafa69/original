import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //add swagger
  const config = new DocumentBuilder()
    .setTitle('Original-Backend')
    .setDescription('E-commerce APP')
    .setVersion('1')
    .addTag('Original')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('original', app, document);

  await app.listen(3000);
}
bootstrap();
