import { Repository } from 'typeorm';
import dbConfig from '../config/database';
import { Disbursement } from '../entities/disbursements';
import { randAlpha, randUuid } from '@ngneat/falso';

export const getByDateAndMerchant = async (
  referenceDate: Date,
  merchantReference: string,
): Promise<Disbursement | null> => {
  const repository: Repository<Disbursement> = dbConfig.getRepository(Disbursement);
  const data: Disbursement | null = await repository.findOne({
    where: { createdAt: referenceDate, merchant: { reference: merchantReference } },
  });

  if (!data) {
    return null;
  }
  return data;
};

export const saveDisbursement = async (disbursement: Disbursement): Promise<Disbursement> => {
  const repository: Repository<Disbursement> = dbConfig.getRepository(Disbursement);
  disbursement.id = randUuid();
  disbursement.reference = randAlpha({ length: 10 }).join('');
  return await repository.save(disbursement);
};
