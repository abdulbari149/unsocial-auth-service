import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { TypeORMError } from 'typeorm';
import { ZodError } from 'zod';
import ApiError from '@/helpers/ApiError';
import { AppLocals } from '@/types/common';
import zodErrorConverter from '@/utils/zodError';
import config from '@/config/config';

const error = (
  err: unknown,
  _req: Request<object, object, object, object, AppLocals>,
  res: Response<object, AppLocals>,
  _next: NextFunction
) => {
  let statusCode: string | number = httpStatus.INTERNAL_SERVER_ERROR;
  let message = 'Something Unexpected Happened on the Server';
  let stack: Error['stack'] = '';
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    stack = err.stack;
  } else if (err instanceof ZodError) {
    message = zodErrorConverter(err);
    statusCode = httpStatus.BAD_REQUEST;
    stack = err.stack;
  } else if (err instanceof TypeORMError || err instanceof Error) {
    message = err.message;
    stack = err.stack;
  }

  res.locals.errorMessage = message;

  res.status(+statusCode).json({
    message,
    code: statusCode,
    ...(config.env === 'development' && { stack })
  });
};

export default error;
