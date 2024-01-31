import morgan from 'morgan';
const cors = require('cors');
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import dbConfig from './config/database';
import compression from 'compression';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as swaggerDocument from '../public/swagger.json';
import express, { Application } from 'express';

import Router from './routes';
import { authMiddleware } from './middlewares/auth';
import process from 'process';
import { Constants } from './utils/constants';
import { CalculateImportedDisbursementsWorker } from './workers/calculateImportedDisbursements';
import { DisburseNewOrders } from './consumers/DisburseNewOrders';

const app: Application = express();
app.use(express.json({ limit: '1mb' }));
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(helmet());
app.use(compression());
app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/*', authMiddleware);
app.use(Router);

const start = async () => {
  try {
    const dbConnection = await dbConfig.initialize();
    console.log('Running needed migrations...');
    const migrations = await dbConnection.runMigrations();
    console.log(`Performed ${migrations.length} migrations`);

    app.listen(Constants.app.port, () => {
      console.log('Server is running on port', Constants.app.port);
    });

    const subscriber = new DisburseNewOrders();
    await subscriber.start();

    const worker = new CalculateImportedDisbursementsWorker();
    await worker.start();
  } catch (err: any) {
    //FIXME: send error for sentry/new relic, or other tool
    console.log('Unable to start app', err);
    process.exit(1);
  }
};

void start();
