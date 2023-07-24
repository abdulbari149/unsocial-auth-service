import app from './app';
import config from './config/config';
import logger from './config/logger';
import { initializeDB } from './database';

const main = async () => {
  await initializeDB();

  app.listen(config.port, () => {
    logger.info(`Server Started at ${config.backendDomain}`);
  });
};

void main();