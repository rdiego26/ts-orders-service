import jwt from 'jsonwebtoken';
import { User } from '../entities/users';

const JWT_KEY: string = process.env.SECRET_JWT || 'default_Key';

export enum Audiences {
  ORDERS = 'ORDERS',
}

export const generateAuthToken = (user: User): string => {
  return jwt.sign({ id: user.id, email: user.email, fullName: user.fullName }, JWT_KEY, {
    expiresIn: '1h',
    audience: [Audiences.ORDERS],
  });
};

export const verifyToken = (token: string): User => {
  try {
    const tokenData = jwt.verify(token, JWT_KEY, {
      audience: [Audiences.ORDERS],
    });
    return tokenData as User;
  } catch (err: any) {
    throw new Error('Unauthenticated');
  }
};
