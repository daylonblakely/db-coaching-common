import { Message, Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T['subject']; //force subject to be from enum
  abstract queueGroupName: string;
  abstract onMessage(data: T['data'], msg: Message): void; //force data type from T
  private client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    // options so we have to manually acknowledge an event when it's recieved and processed
    // allows the listener to process data even if something goes wrong
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable() // allows the listener to get all past events
      .setManualAckMode(true)
      .setAckWait(this.ackWait) //sets timout
      .setDurableName(this.queueGroupName); // allows the listener to only get missed events
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on('message', (msg: Message) => {
      console.log(`Message recieved: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf-8')); // parse a buffer
  }
}
