import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpServerErrorHandling } from './http-server-error-handling.filter';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpServerErrorHandling(httpAdapter));

  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(8080);
}
bootstrap();
