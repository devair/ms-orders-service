import { DataSource } from "typeorm"
import { IOrdersGateway } from "../../../../communication/gateways/IOrdersGateway";
import { Order, OrderStatus } from "../../../../core/entities/Order"
import { OrderEntity } from "../../../../infra/datasource/typeorm/entities/OrderEntity"
import { OrdersRepositoryPostgres } from "../../../../infra/datasource/typeorm/postgres/OrdersRepositoryPostgres"
import { InputUpdateOrderStatusDTO, OutputUpdateOrderStatusDTO } from "../../../dtos/orders/IUpdateOrderStatusDTO";


class UpdateOrderStatusUseCase{
    
    private ordersRepository: IOrdersGateway

    constructor(
        private dataSource: DataSource        
    ) {
        this.ordersRepository = new OrdersRepositoryPostgres(this.dataSource.getRepository(OrderEntity))        
    }
    
    async execute({ id, status }: InputUpdateOrderStatusDTO ): Promise<OutputUpdateOrderStatusDTO> {

        await this.ordersRepository.findById(id)
        let orderUpdate = new Order();
        const orderStatus : OrderStatus | string = status   

        if (!((Object.values(OrderStatus) as string[]).includes(orderStatus))) {
            throw new Error(`Order Status ${status} does not exist`)
        }

        Object.assign(orderUpdate, {
            id: id,
            status: orderStatus
        })

        const orderUpdated = await this.ordersRepository.updateStatus(orderUpdate)
            
        return { 
            id: orderUpdated.id,
            status: orderUpdated.status
        }
    }
}

export { UpdateOrderStatusUseCase }