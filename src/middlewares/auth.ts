import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../services/auth';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth: string | undefined = req.headers.authorization;
  const requestURL = req.originalUrl;
  const publicEndpoints: string[] = ['/healthCheck', '/api/login'];

  if (publicEndpoints.includes(requestURL)) {
    next();
  } else {
    if (auth && auth.startsWith('Bearer')) {
      const token: string = auth.slice(7);

      try {
        //FIXME: this is a hack to extend the request interface (i've tried to extend the express.Request interface but it didn't work)
        (req as any).currentUser = verifyToken(token);
        next();
      } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).end();
      }
    } else {
      res.status(StatusCodes.UNAUTHORIZED).end();
    }
  }
};
