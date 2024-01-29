import { name, version } from '../../package.json';
import process from 'process';

export const Constants = {
  app: {
    port: process.env.PORT,
    environment: process.env.NODE_ENV,
    name,
    version,
  },
  db: {
    URI: process.env.DB_URI,
    POOL_MAX: process.env.POOL_MAX || 3,
  },
  queue: {
    URI: process.env.QUEUE_URI,
    QUEUE_NAME: process.env.QUEUE_NAME,
  },
};
