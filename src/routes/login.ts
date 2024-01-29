import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
const { Validator } = require('express-json-validator-middleware');
const { validate } = new Validator();
const loginSchema = require('../schemas/login');
import LoginController, { ILoginResponse } from '../controllers/login';

const router: Router = express.Router();

router.post('/', validate({ body: loginSchema }), async (req: Request, res: Response) => {
  try {
    const controller: LoginController = new LoginController();
    const response: ILoginResponse = await controller.login(req.body);

    return res.status(StatusCodes.OK).send(response);
  } catch (err: any) {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

export default router;
