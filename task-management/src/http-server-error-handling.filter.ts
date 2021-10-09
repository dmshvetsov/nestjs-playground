import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError, TypeORMError } from 'typeorm';

@Catch()
export class HttpServerErrorHandling extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();

    if (!res.headersSent && exception instanceof QueryFailedError) {
      // TypeORM queries error handler
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message,
        // NOTE: following properties might contain sensitive data
        // you might do not want to pass is to clients
        detail: exception.driverError.detail,
        query: exception.query,
        parameters: exception.parameters,
      });
      return;
    }

    if (!res.headersSent && exception instanceof TypeORMError) {
      // General TypeORM error handling should go last in TypeORM errors
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message,
      });
      return;
    }

    super.catch(exception, host);
  }
}
