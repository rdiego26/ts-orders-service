import * as console from 'console';
import { getPendingToPay } from '../repositories/order';

export class DisbursementsWorker {
  async start() {
    console.log('Starting DisbursementsWorker...');
    const fetchedOrders = await getPendingToPay();
    console.log(`Fetched ${fetchedOrders.length} orders to pay`);
    console.log(`First=${JSON.stringify(fetchedOrders[0].merchant)}`);
  }
}
