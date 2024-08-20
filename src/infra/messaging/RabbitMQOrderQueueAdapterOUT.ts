import amqplib from "amqplib";
import { IOrderQueueAdapterOUT } from "../../core/messaging/IOrderQueueAdapterOUT"

export default class  RabbitMQOrderQueueAdapterOUT implements IOrderQueueAdapterOUT{
       
    private channels!: Map<string, amqplib.ConfirmChannel>;
        
    constructor(
        private connection: amqplib.Connection,
        private queues: string [] 
    ) { 
        this.channels = new Map<string, amqplib.ConfirmChannel>()
    }

    async connect() {

        this.queues.map(async ele => {

            let channel = await this.connection.createConfirmChannel();

            await channel.assertQueue(ele, { durable: true });
            
            this.channels.set(ele, channel)            
        })

    }

    async publish(queueName: string, message: string): Promise<void>{
        
        const messageBuffer = Buffer.from(message);
        
        let channel = this.channels.get(queueName)

        return new Promise((resolve, reject) => {
            channel.sendToQueue(queueName, messageBuffer, {}, (err, ok) => {
                if (err) {
                    reject(new Error(`Something went wrong: ${err}`));
                } else {
                    resolve();
                }
            });
        })
    }    
}
