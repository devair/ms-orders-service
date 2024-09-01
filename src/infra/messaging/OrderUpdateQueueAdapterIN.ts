import amqpCallback from "amqplib/callback_api"
import { QueueNames } from "../../core/messaging/QueueNames"
import { IUpdateOrderUseCase } from "../../core/useCase/IUpdateOrderUseCase"

export class OrderCreatedQueueAdapterIN {
    constructor(
        private rabbitMQUrl: string,
        private updateOrderUseCase: IUpdateOrderUseCase
    ) { }

    async consume(queueName: string) {
        amqpCallback.connect(this.rabbitMQUrl, (err: any, connection: any) => {
            if (err) {
                throw err;
            }
            connection.createChannel((err: any, channel: any) => {
                if (err) {
                    throw err;
                }
                channel.assertQueue(queueName, { durable: true });
                channel.consume(queueName, async (msg: any) => {
                    if (msg !== null) {
                        try {
                            // Processa a mensagem                            
                            const order = JSON.parse(msg.content.toString());

                            console.log('Message received:', order)

                            // Aqui o servico persiste e publica na mesma transacao para o proximo canal
                            await this.updateOrderUseCase.execute({ id: order.id, status: order.status})
                            channel.ack(msg);
                        } catch (error) {
                            console.error('Processing error');
                            // Rejeita a mensagem e reencaminha para a fila
                            channel.nack(msg);
                        }
                    }
                }, { noAck: false })
            })
        })
    }

}