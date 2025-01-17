import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
// import { HttpExceptionFilter } from './core/exception-filter/exception-filter.service';

const config = new DocumentBuilder()
  .setTitle('Engage Server')
  .setDescription('This server handles the Engage API')
  .setVersion('1.0')
  .addTag('Engage')
  .build();

const options: SwaggerCustomOptions = {};
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, options);

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
