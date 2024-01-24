import express from 'express';
import HealthCheckRouter from './healthCheck';

const router = express.Router();

router.use('/healthCheck', HealthCheckRouter);

export default router;
