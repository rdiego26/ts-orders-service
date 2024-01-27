import { Order } from '../entities/orders';
import { getByDateAndMerchant } from '../repositories/disbursements';
import { Disbursement } from '../entities/disbursements';
import { randAlpha, randUuid } from '@ngneat/falso';
import dbConfig from '../config/database';
import { DisbursementOrders } from '../entities/disbursementOrders';
import { getTotalFeeOnMonth } from '../repositories/disbursementsOrders';
import { IsNull, Repository } from 'typeorm';

export class ImportDisbursement {
  public async importDisbursement(order: Order): Promise<void> {
    console.log('Importing disbursement...');

    const queryRunner = dbConfig.createQueryRunner();
    await queryRunner.startTransaction('READ COMMITTED');

    const disbursementRepository: Repository<Disbursement> = dbConfig.manager.getRepository(Disbursement);
    const fetchedDisbursement: Disbursement | null = await disbursementRepository.findOne({
      where: { createdAt: order.createdAt, merchant: { reference: order.merchant.reference } },
    });

    const disbursement = new Disbursement();
    disbursement.merchant = order.merchant;
    disbursement.createdAt = order.createdAt;
    disbursement.id = randUuid();
    disbursement.reference = randAlpha({ length: 10 }).join('');

    try {
      if (!fetchedDisbursement) {
        const savedDisbursement = await dbConfig.manager.save(disbursement);
        const disbursementOrder = new DisbursementOrders();
        disbursementOrder.disbursement = savedDisbursement;
        disbursementOrder.amount = order.amount;
        disbursementOrder.order = order;

        const lastDayFromLastMonth = new Date(
          order.createdAt.getFullYear(),
          order.createdAt.getMonth(),
          order.createdAt.getDay(),
        );
        lastDayFromLastMonth.setDate(0);
        const feeFromLastMonth: number = await getTotalFeeOnMonth(lastDayFromLastMonth, order.merchant.reference);
        disbursementOrder.fee =
          feeFromLastMonth < order.merchant.minimumMonthlyFee ? order.merchant.minimumMonthlyFee : order.calcFee();
        disbursementOrder.id = randUuid();

        await dbConfig.manager.save(disbursementOrder);
      } else {
        const disbursementOrder = new DisbursementOrders();
        disbursementOrder.disbursement = fetchedDisbursement;
        disbursementOrder.amount = order.amount;
        disbursementOrder.order = order;
        disbursementOrder.fee = order.calcFee();

        await dbConfig.manager.save(disbursementOrder);
      }

      await dbConfig.manager.update(Order, { id: order.id, refundedAt: IsNull() }, { refundedAt: order.createdAt });

      await queryRunner.commitTransaction();
    } catch (error: any) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
