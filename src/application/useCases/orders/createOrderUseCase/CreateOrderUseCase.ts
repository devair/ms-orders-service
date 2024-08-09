import { AppDataSource } from "../../../../infra/datasource/typeorm"
import { ICustomersGateway } from "../../../../communication/gateways/ICustomersGateway"
import { IOrderItemsGateway } from "../../../../communication/gateways/IOrderItemsGateway"
import { IOrdersGateway } from "../../../../communication/gateways/IOrdersGateway"
import { IProductsGateway } from "../../../../communication/gateways/IProductsGateway"
import { Order } from "../../../../core/entities/Order"
import { IOrderQueueAdapterOUT } from "../../../../core/messaging/IOrderQueueAdapterOUT"
import { InputCreateOrderDTO, OutputCreateOrderDTO } from "../../../dtos/orders/ICreateOrderDTO"

class CreateOrderUseCase {

    constructor(private orderRepository: IOrdersGateway,
        private orderItemsRepository: IOrderItemsGateway,
        private customersRepository: ICustomersGateway,
        private productsRepository: IProductsGateway,
        private orderPublisher: IOrderQueueAdapterOUT
    ) {

    }
    async execute({ customer, orderItems }: InputCreateOrderDTO): Promise<OutputCreateOrderDTO> {

        let customerFound

        if (customer) {
            customerFound = await this.customersRepository.findByCpf(customer.cpf)

            if (!customerFound) {
                throw new Error(`Customer ${customer.cpf} not found`)
            }
        }

        const order = Order.place(customerFound)
        const promiseArray = orderItems.map(async (item) => {
            const productFound = await this.productsRepository.findByCode(item.product.code)
            
            if(!productFound){
                throw new Error(`Product ${item.product.code} not found`)
            }

            if(!item.quantity){
                throw new Error(`Quantity is missed`)
            }
            if(!item.unitPrice){
                throw new Error(`Unit Price is missed`)
            }

            order.addItem({ product: productFound, quantity: item.quantity, unitPrice: item.unitPrice })

        })

        await Promise.all(promiseArray)

        const queryRunner = AppDataSource.createQueryRunner()
        await queryRunner.startTransaction()

        try {            
            const orderCreated = await this.orderRepository.create(order)    
            await this.orderItemsRepository.createAll(order.orderItems)    
            
            const orderMessage = {
                id: orderCreated.id,
                status: orderCreated.status,
                amount: orderCreated.amount
            }
              // Publicar evento de pedido criado
            await this.orderPublisher.publish("orderCreated",JSON.stringify(orderMessage))
            
            await queryRunner.commitTransaction()    

            return orderMessage

        } catch (error) {
            await queryRunner.rollbackTransaction()
            throw error
        }
        finally{
            await queryRunner.release()
        }
    }
}

export { CreateOrderUseCase }