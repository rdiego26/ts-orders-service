import { Repository } from 'typeorm';
import dbConfig from '../config/database';
import { User } from '../entities/users';
import crypto from 'crypto';
import { passwordHashUtil } from '../utils/passwordHash';

export interface ICreateUserPayload {
  fullName: string;
  password: string;
  confirmation: string;
  email: string;
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const repository: Repository<User> = dbConfig.getRepository(User);
  const user: User | null = await repository.findOne({ where: { email } });
  if (!user) {
    return null;
  }
  return user;
};

export const createUser = async (payload: ICreateUserPayload): Promise<User> => {
  const repository: Repository<User> = dbConfig.getRepository(User);
  const user: User = new User();
  payload.password = passwordHashUtil(payload.password);
  user.id = crypto.randomUUID();
  const dataToInsert = {
    ...user,
    ...payload,
  };

  return repository.save(dataToInsert);
};
