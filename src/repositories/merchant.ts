import { Repository } from 'typeorm';
import dbConfig from '../config/database';
import { Merchant } from '../entities/merchants';

export const getByReference = async (reference: string): Promise<Merchant | null> => {
  const repository: Repository<Merchant> = dbConfig.getRepository(Merchant);
  const data: Merchant | null = await repository.findOne({ where: { reference } });

  if (!data) {
    return null;
  }
  return data;
};
