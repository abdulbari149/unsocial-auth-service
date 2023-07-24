import app from './app';
import config from './config/config';
import logger from './config/logger';
import { initializeDB } from './database';
import { redisClient } from './library/redis.library';

const main = async () => {
  await initializeDB();
  await redisClient.connect();

  app.listen(config.port, () => {
    logger.info(`Server Started at ${config.backendDomain}`);
  });
};

void main();