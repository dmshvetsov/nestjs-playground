import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpServerErrorHandling } from './http-server-error-handling.filter';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  Logger.verbose(
    `Starting application in the ${process.env.NODE_ENV} environment`,
  );

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpServerErrorHandling(httpAdapter));

  app.useGlobalInterceptors(new TransformInterceptor());

  const configService = app.get(ConfigService);
  await app.listen(configService.get('APP_PORT'));
  Logger.verbose(
    `Application server is listening on port ${configService.get('APP_PORT')}`,
  );
}
bootstrap();
