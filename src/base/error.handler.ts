import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { KoalaException } from './error.interface';
import { Response } from 'express';

@Catch(KoalaException)
export class KoalaExceptionFilter implements ExceptionFilter {
  catch(exception: KoalaException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(400).json({
      code: exception.code,
      message: exception.message,
    });
  }
}
