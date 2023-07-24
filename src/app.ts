import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import morgan from './config/morgan';

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

app.get('/', (_req: Request, res: Response) => {
  const message = 'Error: Occured';
  res.locals.errorMessage = message;
  res.status(500).send(message);
});

export default app;
