import { In, IsNull, Repository, UpdateResult } from 'typeorm';
import dbConfig from '../config/database';
import { Order } from '../entities/orders';
import { DisbursementFrequency } from '../entities/merchants';

export const getPendingToPay = async (): Promise<Order[]> => {
  const repository: Repository<Order> = dbConfig.getRepository(Order);
  return await repository.find({ relations: { merchant: true }, where: { refundedAt: IsNull() }, take: 1000 });
};

export const getDailyPendingToPay = async (): Promise<Order[]> => {
  const repository: Repository<Order> = dbConfig.getRepository(Order);
  return await repository.find({
    relations: { merchant: true },
    where: { merchant: { disbursementFrequency: DisbursementFrequency.DAILY }, refundedAt: IsNull() },
    take: 10,
  });
};

export const getPendingToDisbursement = async (): Promise<Order[]> => {
  const repository: Repository<Order> = dbConfig.getRepository(Order);
  return await repository.find({ where: { refundedAt: IsNull() } });
};

export const setRefunded = async (refundedAt: Date, ids: string[]): Promise<UpdateResult> => {
  const repository: Repository<Order> = dbConfig.getRepository(Order);

  return await repository.update({ id: In(ids), refundedAt: IsNull() }, { refundedAt });
};
