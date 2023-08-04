import morgan from 'morgan';
import { Request, Response } from 'express';
import config from './config';
import logger from './logger';
import { AppLocals } from '@/types/common';

morgan.token<
  Request<object, object, object, object, AppLocals>,
  Response<object, AppLocals>
>('message', (_req, res) => res.locals?.errorMessage ?? '');

const getIpFormat = () =>
  config.env === 'production' ? ':remote-addr - ' : '';

const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (_req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) }
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (_req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) }
});

export default { successHandler, errorHandler };
