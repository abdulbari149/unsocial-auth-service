import app from './app';
import config from './config/config';
import logger from './config/logger';
import { initializeDB } from './database';
import { redisClient } from './library/redis.library';
import { exitServer, unexpectedErrorHandler } from './utils/errorHandlers';


const main = async () => {
  await initializeDB();
  await redisClient.connect();

  const server = app.listen(config.port, () => {
    logger.info(`Server Started at ${config.backendDomain}`);
  });

  process.on('uncaughtException', unexpectedErrorHandler(server));
  process.on('unhandledRejection', unexpectedErrorHandler(server));
  process.on('SIGTERM', exitServer(server));
};

void main();