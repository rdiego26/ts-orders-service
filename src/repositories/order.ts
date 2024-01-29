import { In, IsNull, Repository, UpdateResult } from 'typeorm';
import dbConfig from '../config/database';
import { Order } from '../entities/orders';

export const getPendingToPay = async (): Promise<Order[]> => {
  const repository: Repository<Order> = dbConfig.getRepository(Order);
  return await repository.find({
    relations: { merchant: true },
    where: { refundedAt: IsNull() },
  });
};

export const setRefunded = async (refundedAt: Date, ids: string[]): Promise<UpdateResult> => {
  const repository: Repository<Order> = dbConfig.getRepository(Order);

  return await repository.update({ id: In(ids), refundedAt: IsNull() }, { refundedAt });
};
