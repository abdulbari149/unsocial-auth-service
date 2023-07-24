import express, { Request, Response } from 'express';
import config from './config/config';

const app = express();

app.get('/', (_req: Request, res: Response) => {
  res.send('Hurray!!. Your server is up and running');
});

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
