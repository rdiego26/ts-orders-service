import morgan from 'morgan';
const cors = require('cors');
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import compression from 'compression';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as swaggerDocument from '../public/swagger.json';
import express, { Application } from "express";

import Router from './routes';
import process from "process";
import {Constants} from "./utils/constants";

const app: Application = express();
app.use(express.json({ limit: '1mb' }));
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(helmet());
app.use(compression());
app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(Router);


const start = async() => {
    try {
        app.listen(Constants.app.port, () => {
            console.log('Server is running on port', Constants.app.port);
        });
    } catch (err: any) {
        console.log('Unable to start app', err);
        process.exit(1);
    }
}

void start();
