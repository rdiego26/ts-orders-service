import { Repository } from 'typeorm';
import dbConfig from '../config/database';
import { User } from '../entities/users';

export const getUser = async (id: string): Promise<User | null> => {
  const repository: Repository<User> = dbConfig.getRepository(User);
  const user: User | null = await repository.findOne({
    where: { id },
  });

  if (!user) {
    return null;
  }
  return user;
};
