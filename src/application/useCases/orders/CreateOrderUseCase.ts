import { DataSource } from "typeorm"
import { ICustomersGateway } from "../../../communication/gateways/ICustomersGateway"
import { IProductsGateway } from "../../../communication/gateways/IProductsGateway"
import { Order } from "../../../core/entities/Order"
import { IOrderQueueAdapterOUT } from "../../../core/messaging/IOrderQueueAdapterOUT"
import { QueueNames } from "../../../core/messaging/QueueNames"
import { CustomerEntity } from "../../../infra/datasource/typeorm/entities/CustomerEntity"
import { OrderEntity } from "../../../infra/datasource/typeorm/entities/OrderEntity"
import { OrderItemEntity } from "../../../infra/datasource/typeorm/entities/OrderItemEntity"
import { ProductEntity } from "../../../infra/datasource/typeorm/entities/ProductEntity"
import { CustomersRepositoryPostgres } from "../../../infra/datasource/typeorm/postgres/CustomersRepositoryPostgres"
import { ProductsRepositoryPostgres } from "../../../infra/datasource/typeorm/postgres/ProductsRepositoryPostgres"
import { InputCreateOrderDTO, OutputCreateOrderDTO } from "../../dtos/orders/ICreateOrderDTO"
import { OutputOrderQueueDTO } from "../../dtos/orders/ICreateOrderQueueDTO"


class CreateOrderUseCase {

    private customersRepository: ICustomersGateway
    private productsRepository: IProductsGateway
    
    constructor(
        private dataSource: DataSource,
        private orderToPay: IOrderQueueAdapterOUT        
    ) {
        this.customersRepository = new CustomersRepositoryPostgres(this.dataSource.getRepository(CustomerEntity))
        this.productsRepository = new ProductsRepositoryPostgres(this.dataSource.getRepository(ProductEntity))

    }
    async execute({ customer, orderItems }: InputCreateOrderDTO): Promise<OutputCreateOrderDTO> {

        let customerFound
        if(!orderItems){
            throw new Error("orderItems missing")
        }        

        if (customer) {
            customerFound = await this.customersRepository.findByCpf(customer.cpf)

            if (!customerFound) {
                throw new Error(`Customer ${customer.cpf} not found`)
            }
        }

        const order = Order.place(customerFound)
        

        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.startTransaction()

        try {            

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

            const orderCreated = await queryRunner.manager.getRepository(OrderEntity).save(order)

            await queryRunner.manager.getRepository(OrderItemEntity).save(order.orderItems)    
            
            const orderMessage: OutputOrderQueueDTO = {
                orderId: orderCreated.id,
                customerName: orderCreated.customer? orderCreated.customer.name: '',
                status: orderCreated.status,
                amount: orderCreated.amount
            }

            // Pedido pendente de pagamento
            await this.orderToPay.publish(QueueNames.ORDER_CREATED,JSON.stringify(orderMessage))
            
            await queryRunner.commitTransaction()    
            
            const orderReturn = {
                id: orderCreated.id,
                status: orderCreated.status,
                amount: orderCreated.amount
            }

            return orderReturn

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