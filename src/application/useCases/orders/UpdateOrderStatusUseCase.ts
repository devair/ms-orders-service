import { DataSource } from "typeorm"
import { IOrdersGateway } from "../../../communication/gateways/IOrdersGateway"
import { OrderStatus } from "../../../core/entities/Order"
import { OrderEntity } from "../../../infra/datasource/typeorm/entities/OrderEntity"
import { OrdersRepositoryPostgres } from "../../../infra/datasource/typeorm/postgres/OrdersRepositoryPostgres"
import { InputUpdateOrderStatusDTO, OutputUpdateOrderStatusDTO } from "../../dtos/orders/IUpdateOrderStatusDTO"
import { IOrderQueueAdapterOUT } from "../../../core/messaging/IOrderQueueAdapterOUT"
import { QueueNames } from "../../../core/messaging/QueueNames"
import { IOrderItemsGateway } from "../../../communication/gateways/IOrderItemsGateway"
import { OrderItemsRepositoryPostgres } from "../../../infra/datasource/typeorm/postgres/OrderItemsRepositoryPostgres"
import { OrderItemEntity } from "../../../infra/datasource/typeorm/entities/OrderItemEntity"
import { OutputOrderItemQueueDTO, OutputOrderQueueDTO } from "../../dtos/orders/ICreateOrderQueueDTO"
import { IUpdateOrderUseCase } from "../../../core/useCase/IUpdateOrderUseCase"


class UpdateOrderStatusUseCase implements IUpdateOrderUseCase{
    
    private ordersRepository: IOrdersGateway
    private orderItemRepository: IOrderItemsGateway

    constructor(
        private dataSource: DataSource,
        private orderToProduce: IOrderQueueAdapterOUT        
    ) {
        this.ordersRepository = new OrdersRepositoryPostgres(this.dataSource.getRepository(OrderEntity))   
        this.orderItemRepository = new OrderItemsRepositoryPostgres(this.dataSource.getRepository(OrderItemEntity))        
    }
    
    async execute({ id, status }: InputUpdateOrderStatusDTO ): Promise<OutputUpdateOrderStatusDTO> {

        const orderFound = await this.ordersRepository.findById(id)
        let orderUpdate = orderFound
        const orderStatus : OrderStatus | string = status   

        if (!((Object.values(OrderStatus) as string[]).includes(orderStatus))) {
            throw new Error(`Order Status ${status} does not exist`)
        }

        Object.assign(orderUpdate, {
            id: id,
            status: orderStatus
        })

        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.startTransaction()

        try {            
            const orderUpdated = await this.ordersRepository.updateStatus(orderUpdate)

            // Pedido pendente de producao
            const orderItensCreated = await this.orderItemRepository.findByOrderId(orderUpdated.id)

            let orderItemQueueOutput: OutputOrderItemQueueDTO[] = []
            orderItensCreated.map(elem =>{
                orderItemQueueOutput.push({
                    productName: elem.product.name,
                    productCode: elem.product.code,
                    quantity: elem.quantity
                })
            })

            const orderMessage: OutputOrderQueueDTO = {
                orderId: orderUpdated.id,
                customerName: orderUpdated.customer? orderUpdated.customer.name: '',
                status: orderUpdated.status,
                amount: orderUpdated.amount,
                items : orderItemQueueOutput
            }
            
            switch (orderStatus){
                case OrderStatus.DONE: {
                    await this.orderToProduce.publish(QueueNames.ORDER_FINISHED,JSON.stringify(orderMessage))     

                    const customerMessage = {
                        orderId: orderMessage.orderId,
                        status: orderMessage.status,
                    }

                    await this.orderToProduce.publish(QueueNames.CUSTOMER_NOTIFICATION,JSON.stringify(customerMessage))     
                    
                    break
                }
                case OrderStatus.REJECTED: {
                    await this.orderToProduce.publish(QueueNames.PAYMENT_REJECTED,JSON.stringify(orderMessage))     
                    break
                }
                case OrderStatus.RECEIVED: {
                    await this.orderToProduce.publish(QueueNames.ORDER_TO_PRODUCE,JSON.stringify(orderMessage))                 
                    break
                }
            }
           
            return { 
                id: orderUpdated.id,
                status: orderUpdated.status
            }

        } catch (error) {
            await queryRunner.rollbackTransaction()
            throw error
        }
        finally{
            await queryRunner.release()
        }
            
    }
}

export { UpdateOrderStatusUseCase }