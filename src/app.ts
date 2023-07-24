import express, { Request, Response } from 'express';
import morgan from './config/morgan';

const app = express();

app.use(morgan.successHandler)
app.use(morgan.errorHandler)

app.get('/', (_req: Request, res: Response) => {
  const message = 'Error: Occured'
  res.locals.errorMessage = message
  res.status(500).send(message);
});


export default app;