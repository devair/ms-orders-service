import amqpCallback from "amqplib/callback_api"
import { UpdateOrderStatusUseCase } from "../../application/useCases/orders/UpdateOrderStatusUseCase"
import { OutputOrderQueueDTO } from "../../application/dtos/orders/ICreateOrderQueueDTO"
import { QueueNames } from "../../core/messaging/QueueNames"

export class OrderCreatedQueueAdapterIN {
    constructor(
        private rabbitMQUrl: string,
        private updateOrderUseCase: UpdateOrderStatusUseCase
    ) { }

    async consume() {
        amqpCallback.connect(this.rabbitMQUrl, (err: any, connection: any) => {
            if (err) {
                throw err;
            }
            connection.createChannel((err: any, channel: any) => {
                if (err) {
                    throw err;
                }
                channel.assertQueue(QueueNames.ORDER_PAID, { durable: true });
                channel.consume(QueueNames.ORDER_PAID, async (msg: any) => {
                    if (msg !== null) {
                        try {
                            // Processa a mensagem                            
                            const order = JSON.parse(msg.content.toString());

                            console.log('Payment - Received:', order)

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