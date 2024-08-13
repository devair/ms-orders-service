import { DataSource } from "typeorm"
import { IOrdersGateway } from "../../../communication/gateways/IOrdersGateway"
import { OrderEntity } from "../../../infra/datasource/typeorm/entities/OrderEntity"
import { OrdersRepositoryPostgres } from "../../../infra/datasource/typeorm/postgres/OrdersRepositoryPostgres"
import { OutputFindOrderDTO } from "../../dtos/orders/IFindOrderDTO"

class ListOrdersUseCase {
    
    private ordersRepository: IOrdersGateway

    constructor(
        private dataSource: DataSource        
    ) {
        this.ordersRepository = new OrdersRepositoryPostgres(this.dataSource.getRepository(OrderEntity))        
    }

    async execute(): Promise<OutputFindOrderDTO[]> { 
                
        const orders = await this.ordersRepository.list()

        const output = orders.map((elem) => ({
            id: elem.id,
            status: elem.status,
            createdAt: elem.createdAt,
            amount: elem.amount,
            customerId: elem.customerId          
        }))

        return output
    }
}

export { ListOrdersUseCase }