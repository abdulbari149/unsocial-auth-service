import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import morgan from './config/morgan';
import { notFound, error } from './middlewares';

const app = express();

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

// not found middleware
app.use(notFound);

// error middleware
app.use(error);

export default app;
