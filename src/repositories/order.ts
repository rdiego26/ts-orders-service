import { In, IsNull, Repository, UpdateResult } from 'typeorm';
import dbConfig from '../config/database';
import { Order } from '../entities/orders';
import crypto from 'crypto';
import { Merchant } from '../entities/merchants';

export interface ICreateOrderPayload {
  merchantReference: string;
  amount: number;
}

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

export const createOrder = async (payload: ICreateOrderPayload): Promise<Order> => {
  const orderRepository: Repository<Order> = dbConfig.getRepository(Order);
  const merchantRepository: Repository<Merchant> = dbConfig.getRepository(Merchant);

  const merchant: Merchant | null = await merchantRepository.findOne({
    where: { reference: payload.merchantReference },
  });
  const order: Order = new Order();

  order.id = crypto.randomUUID();
  order.merchant = merchant!!;
  order.amount = payload.amount;

  return orderRepository.save(order);
};
