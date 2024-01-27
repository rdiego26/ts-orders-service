import * as console from 'console';
import { getPendingToPay } from '../repositories/order';
import { ImportDisbursement } from '../services/importDisbursement';
import { DisbursementFrequency } from '../entities/merchants';

export class CalculateImportedDisbursementsWorker {
  async start() {
    console.log('Starting CalculateImportedDisbursementsWorker...');
    const fetchedOrders = await getPendingToPay(DisbursementFrequency.DAILY);
    console.log(`Fetched ${fetchedOrders.length} orders to pay`);
    const importDisbursementService = new ImportDisbursement();

    for (const order of fetchedOrders) {
      await importDisbursementService.importDisbursement(order);
    }
  }
}
