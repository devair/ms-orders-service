import { DataSource } from "typeorm"
import { IOrdersGateway } from "../../../../communication/gateways/IOrdersGateway"
import { OutputFindOrderDTO } from "../../../dtos/orders/IFindOrderDTO";
import { OrderEntity } from "../../../../infra/datasource/typeorm/entities/OrderEntity"
import { OrdersRepositoryPostgres } from "../../../../infra/datasource/typeorm/postgres/OrdersRepositoryPostgres"

class FindByIdOrderUseCase {

    private ordersRepository: IOrdersGateway

    constructor(
        private dataSource: DataSource        
    ) {
        this.ordersRepository = new OrdersRepositoryPostgres(this.dataSource.getRepository(OrderEntity))        
    }
    
    async execute(id: number): Promise<OutputFindOrderDTO> {

        const orderFound = await this.ordersRepository.findById(id);

        if (!orderFound) {
            throw new Error(`Order ${id} not found`)
        }

        return {
            id: orderFound.id,
            status: orderFound.status,
            createdAt: orderFound.createdAt,
            amount: orderFound.amount,
            customerId: orderFound.customerId          
        }
    }
}
export { FindByIdOrderUseCase }