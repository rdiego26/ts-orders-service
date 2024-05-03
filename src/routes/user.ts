import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserController from '../controllers/user';
import { DomainError } from '../utils/exceptions';
import { User } from '../entities/users';
const { Validator } = require('express-json-validator-middleware');
const { validate } = new Validator();
const createSchema = require('../schemas/users/create');

const router = express.Router();

router.post('/', validate({ body: createSchema }), async (req: Request, res: Response) => {
  try {
    const controller: UserController = new UserController();
    const response: User = await controller.createUser(req.body);

    return res.status(StatusCodes.CREATED).send(response);
  } catch (e: any) {
    if (e?.name === 'DomainError') {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: e.message });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Unable to perform the operation' });
  }
});

export default router;
