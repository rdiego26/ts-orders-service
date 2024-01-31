import { Between, Repository } from 'typeorm';
import dbConfig from '../config/database';
import { DisbursementOrders } from '../entities/disbursementOrders';
import { DateUtils } from '../utils/date';
import { Disbursement } from '../entities/disbursements';
import { randAlpha, randUuid } from '@ngneat/falso';

export const getTotalFeeOnMonth = async (referenceDate: Date, merchantReference: string): Promise<number> => {
  const repository: Repository<DisbursementOrders> = dbConfig.getRepository(DisbursementOrders);
  const firstDate = DateUtils.getFirstDayOfMonth(referenceDate.getFullYear(), referenceDate.getMonth());
  const lastDate = DateUtils.getLastDayOfMonth(referenceDate.getFullYear(), referenceDate.getMonth());

  const result: number | null = await repository.sum('fee', {
    order: { merchant: { reference: merchantReference }, createdAt: Between(firstDate, lastDate) },
  });

  return result || 0;
};

export const saveDisbursementOrder = async (item: DisbursementOrders): Promise<DisbursementOrders> => {
  const repository: Repository<DisbursementOrders> = dbConfig.getRepository(DisbursementOrders);
  item.id = randUuid();
  return await repository.save(item);
};
