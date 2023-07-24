import express, { Request, Response } from 'express';
import config from './config/config';
import morgan from './config/morgan';

const app = express();
const PORT = config.port;


app.use(morgan.successHandler)
app.use(morgan.errorHandler)

app.get('/', (_req: Request, res: Response) => {
  const message = 'Error: Occured'
  res.locals.errorMessage = message
  res.status(500).send(message);
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
