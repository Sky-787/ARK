import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const resObj = exceptionResponse as Record<string, any>;
        message = resObj.message || exception.message;
        error = resObj.error || exception.name;
      } else {
        message = exception.message;
        error = exception.name;
      }
    } else if (exception instanceof QueryFailedError) {
      const driverError = (exception as any).driverError;
      const code = driverError?.code;

      if (code === '23505') {
        // Unique violation
        status = HttpStatus.CONFLICT;
        error = 'Conflict';
        message =
          driverError?.detail ||
          'Ya existe un registro con los datos suministrados.';
      } else if (code === '23503') {
        // Foreign key violation
        status = HttpStatus.BAD_REQUEST;
        error = 'Bad Request';
        message =
          driverError?.detail || 'Referencia a entidad relacionada no válida.';
      } else {
        status = HttpStatus.BAD_REQUEST;
        error = 'Database Error';
        message = exception.message;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      error = exception.name;
    }

    this.logger.error(
      `[${request.method}] ${request.url} - Status: ${status} - Error: ${error} - Message: ${JSON.stringify(message)}`,
    );

    response.status(status).json({
      statusCode: status,
      error,
      message: Array.isArray(message) ? message : [message],
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
