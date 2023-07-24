import { IncomingMessage, Server, ServerResponse } from 'http';
import logger from '../config/logger';

type AppServer = Server<typeof IncomingMessage, typeof ServerResponse>;

type UnexpectedErrorHandler = <T extends Error>(
  error: T,
  server: AppServer
) => void;

const exitHandler = (server: AppServer) => () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

export const unexpectedErrorHandler: (
  server: AppServer
) => UnexpectedErrorHandler = (server) => (error) => {
  logger.error(error);
  exitHandler(server);
};

export const exitServer = (server: Server) => () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
};
