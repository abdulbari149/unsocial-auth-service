import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from '@/config/morgan';
import { notFound, error } from '@/middlewares';
import config from '@/config/config';
import routesV1 from '@/routes/v1';

const app = express();

// set security HTTP headers
app.use(helmet());

// gzip compression
app.use(compression());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// serving static images
app.use(express.static(path.resolve(__dirname, '../public')));

// morgan for api logging
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// enable cors
app.use(cors());

app.get('/', (_req: Request, res: Response, _next: NextFunction) => {
  res.send('Harwaqt App Backend Running!!!');
});

app.use(config.apiVersion.v1, routesV1);

// not found middleware
app.use(notFound);

// error middleware
app.use(error);

export default app;
