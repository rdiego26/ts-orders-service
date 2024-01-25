import { IsNull, Repository } from 'typeorm';
import dbConfig from '../config/database';
import { Order } from '../entities/orders';

export const getPendingToPay = async (): Promise<Order[]> => {
  const repository: Repository<Order> = dbConfig.getRepository(Order);
  return await repository.find({ relations: { merchant: true }, where: { refundedAt: IsNull() } });
};

export const getPendingToDisbursement = async (): Promise<Order[]> => {
  const repository: Repository<Order> = dbConfig.getRepository(Order);
  return await repository.find({ where: { refundedAt: IsNull() } });
};
