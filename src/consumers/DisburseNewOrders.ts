import queueConnection from '../services/queueConnection';
import { Constants } from '../utils/constants';
import { INotification } from '../services/notification';
import { ImportDisbursement } from '../services/importDisbursement';
import { findByOrderById } from '../repositories/order';
import * as console from 'console';

export class DisburseNewOrders {
  async start() {
    console.log('Starting DisburseNewOrders...');

    await queueConnection.connect();
    await queueConnection.consume(Constants.queue.QUEUE_NAME!!, this.handleIncomingNotification);
  }

  private async handleIncomingNotification(msg: string) {
    try {
      const parsedMessage: INotification = JSON.parse(msg);
      console.log(`Received Notification`, parsedMessage);
      const importDisbursementService = new ImportDisbursement();
      const order = await findByOrderById(parsedMessage.orderId);
      if (!order) {
        console.error(`Order not found for id ${parsedMessage.orderId}`);
      } else {
        await importDisbursementService.importDisbursement(order);
      }
    } catch (error) {
      console.error(`Error While Parsing the message`);
    }
  }
}
