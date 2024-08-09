import amqplib from "amqplib";
import { IOrderQueueAdapterOUT } from "../../core/messaging/IOrderQueueAdapterOUT"

export default class  RabbitMQOrderQueueAdapterOUT implements IOrderQueueAdapterOUT{
    
    private connection! : amqplib.Connection
    private channel!: amqplib.ConfirmChannel;
    
    public static readonly rabbitMqUrl = process.env.RABBITMQ_URL ? process.env.RABBITMQ_URL : '';
    
    constructor() { 
        this.connection = null
        this.channel = null
    }

    async connect() {
        if(!this.connection){
            this.connection = await amqplib.connect(RabbitMQOrderQueueAdapterOUT.rabbitMqUrl)
            this.channel = await this.connection.createConfirmChannel();            
        }
    }

    async publish(queue: string, message: string): Promise<void>{
        
        const messageBuffer = Buffer.from(message);
        
        await this.connect();
        await this.channel.assertQueue(queue, { durable: true });

        return new Promise((resolve, reject) => {
            this.channel.sendToQueue(queue, messageBuffer, {}, (err, ok) => {
                if (err) {
                    reject(new Error(`Something went wrong: ${err}`));
                } else {
                    resolve();
                }
            });
        })
    }    
}
