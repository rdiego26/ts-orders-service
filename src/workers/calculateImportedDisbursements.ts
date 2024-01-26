import * as console from 'console';
import { getPendingToPay, setRefunded } from '../repositories/order';
import { getByDateAndMerchant, saveDisbursement } from '../repositories/disbursements';
import { Disbursement } from '../entities/disbursements';
import { getTotalFeeOnMonth, saveDisbursementOrder } from '../repositories/disbursementsOrders';
import { DisbursementOrders } from '../entities/disbursementOrders';
import { randAlpha, randUuid } from '@ngneat/falso';

export class CalculateImportedDisbursementsWorker {
  async start() {
    console.log('Starting CalculateImportedDisbursementsWorker...');
    const fetchedOrders = await getPendingToPay();
    console.log(`Fetched ${fetchedOrders.length} orders to pay`);

    for (const order of fetchedOrders) {
      const fetchedDisbursement = await getByDateAndMerchant(order.createdAt, order.merchant.reference);
      const disbursement = new Disbursement();
      disbursement.merchant = order.merchant;
      disbursement.createdAt = order.createdAt;
      disbursement.id = randUuid();
      disbursement.reference = randAlpha({ length: 10 }).join('');

      if (!fetchedDisbursement) {
        const savedDisbursement = await saveDisbursement(disbursement);

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

        await saveDisbursementOrder(disbursementOrder);
        await setRefunded(order.createdAt, [order.id]);
      } else {
        const savedDisbursement = await saveDisbursement(disbursement);

        const disbursementOrder = new DisbursementOrders();
        disbursementOrder.disbursement = savedDisbursement;
        disbursementOrder.amount = order.amount;
        disbursementOrder.order = order;
        disbursementOrder.fee = order.calcFee();

        await saveDisbursementOrder(disbursementOrder);
      }
    }
  }
}
