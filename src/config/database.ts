import { DataSource } from 'typeorm';
import { Constants } from '../utils/constants';
import { Order } from '../entities/orders';
import { Merchant } from '../entities/merchants';
import process from 'process';

let config: DataSource;

config = new DataSource({
  type: 'postgres',
  url: Constants.db.URI,
  entities: [Merchant, Order],
  ...(Constants.app.environment === 'development'
    ? { logging: true, migrations: [process.cwd() + '/src/migrations/*.ts'] }
    : {
        migrations: [process.cwd() + '/build/migrations/*.js'],
        extra: {
          max: Constants.db.POOL_MAX,
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
});

export default config;
