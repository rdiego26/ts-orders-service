import client, { Connection, Channel } from 'amqplib';
import { Constants } from '../utils/constants';

type HandlerCB = (msg: string) => any;

class QueueConnection {
  connection!: Connection;
  channel!: Channel;
  private connected!: Boolean;

  async connect() {
    if (this.connected && this.channel) return;
    else this.connected = true;

    try {
      console.log(`⌛️ Connecting to Queue Server`);
      this.connection = await client.connect(Constants.queue.URI!!);

      console.log(`✅ Queue Connection is ready`);

      this.channel = await this.connection.createChannel();

      console.log(`🛸 Created RabbitMQ Channel successfully`);
    } catch (error) {
      console.error(error);
      console.error(`Not connected to MQ Server`);
    }
  }

  async sendToQueue(queue: string, message: any) {
    try {
      if (!this.channel) {
        await this.connect();
      }

      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async consume(queueName: string, handleIncomingNotification: HandlerCB) {
    await this.channel.assertQueue(queueName, {
      durable: true,
    });

    await this.channel.consume(
      queueName,
      (msg) => {
        {
          if (!msg) {
            return console.error(`Invalid incoming message`);
          }
          handleIncomingNotification(msg?.content?.toString());
          this.channel.ack(msg);
        }
      },
      {
        noAck: false,
      },
    );
  }
}

const mqConnection = new QueueConnection();

export default mqConnection;
