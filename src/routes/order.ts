import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DomainError } from '../utils/exceptions';
import OrderController from '../controllers/order';
import { Order } from '../entities/orders';
import queueConnection from '../services/queueConnection';
import { INotification, sendNotification } from '../services/notification';
const { Validator } = require('express-json-validator-middleware');
const { validate } = new Validator();
const createSchema = require('../schemas/orders/create');

const router = express.Router();

router.post('/', validate({ body: createSchema }), async (req: Request, res: Response) => {
  try {
    const controller: OrderController = new OrderController();
    const response: Order = await controller.createOrder(req.body);

    await queueConnection.connect();
    const message: INotification = {
      orderId: response.id,
    };
    await sendNotification(message);

    return res.status(StatusCodes.CREATED).send(response);
  } catch (e: any) {
    if (e?.name === 'DomainError') {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: e.message });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Unable to perform the operation' });
  }
});

export default router;
