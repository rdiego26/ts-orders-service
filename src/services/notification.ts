import mqConnection from './queueConnection';
import process from 'process';

export type INotification = {
  orderId: string;
};

export const sendNotification = async (notification: INotification) => {
  await mqConnection.sendToQueue(process.env.QUEUE_NAME!!, notification);

  console.log(`Sent the notification to consumer`);
};
