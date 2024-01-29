import express from 'express';
import HealthCheckRouter from './healthCheck';
import LoginRouter from './login';
import UserRouter from './user';
import OrderRouter from './order';

const router = express.Router();

router.use('/healthCheck', HealthCheckRouter);
router.use('/api/login', LoginRouter);
router.use('/api/users', UserRouter);
router.use('/api/orders', OrderRouter);

export default router;
