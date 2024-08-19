import { DataSource } from "typeorm"
import { IOrdersGateway } from "../../../communication/gateways/IOrdersGateway"
import { OrderStatus } from "../../../core/entities/Order"
import { OrderEntity } from "../../../infra/datasource/typeorm/entities/OrderEntity"
import { OrdersRepositoryPostgres } from "../../../infra/datasource/typeorm/postgres/OrdersRepositoryPostgres"
import { InputUpdateOrderStatusDTO, OutputUpdateOrderStatusDTO } from "../../dtos/orders/IUpdateOrderStatusDTO"
import { IUpdateOrderUseCase } from "../../../core/useCase/IUpdateOrderUseCase"

class UpdateOrderDoneUseCase implements IUpdateOrderUseCase{
    
    private ordersRepository: IOrdersGateway
    
    constructor(
        private dataSource: DataSource    ) {
        this.ordersRepository = new OrdersRepositoryPostgres(this.dataSource.getRepository(OrderEntity))           
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
                
            await queryRunner.commitTransaction()

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

export { UpdateOrderDoneUseCase }