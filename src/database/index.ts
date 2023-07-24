import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from '../config/config';
import logger from '../config/logger';

export const dataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: false,
  logging: true,
  subscribers: [],
  entities: [],
  migrations: [],
});

export const initializeDB = async () => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize().then(() => {
      logger.info('Database is connected successfully');
    });
  }
};
