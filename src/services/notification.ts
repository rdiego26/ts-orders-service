import mqConnection from './queueConnection';
import { Constants } from '../utils/constants';

export type INotification = {
  orderId: string;
};

export const sendNotification = async (notification: INotification) => {
  await mqConnection.sendToQueue(Constants.queue.QUEUE_NAME!!, notification);

  console.log(`Sent the notification to consumer[${Constants.queue.QUEUE_NAME!!}]`);
};
