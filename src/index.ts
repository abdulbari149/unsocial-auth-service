import express, { Request, Response } from 'express';

const app = express();

app.get('/', (_req: Request, res: Response) => {
  res.send('Hurray!!. Your server is up and running');
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
