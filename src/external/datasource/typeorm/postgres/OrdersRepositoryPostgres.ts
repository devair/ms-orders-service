import { Repository } from "typeorm"
import { AppDataSource } from ".."
import { IOrdersGateway } from "../../../../communication/gateways/IOrdersGateway"
import { Order, OrderStatus } from "../../../../core/entities/Order"
import { OrderEntity } from "../entities/OrderEntity"

class OrdersRepositoryPostgres implements IOrdersGateway{
    
    private repository: Repository<Order>

    constructor(){
        this.repository = AppDataSource.getRepository(OrderEntity)
    }

    async create(order: Order): Promise<Order> {        
        const orderCreated = await this.repository.save(order)
        return orderCreated
    }

    async list(): Promise<Order[]> {
        const all = await this.repository
        .createQueryBuilder('order')
        .where('status IN (:...status)', { status: [OrderStatus.DONE, OrderStatus.IN_PROGRESS, OrderStatus.RECEIVED ]})
        .orderBy('created_at', 'ASC')
        .getMany()

        return all
    }

    async findById(id: number): Promise<Order> {
        const order = this.repository.findOne({where: { id }})
        return order
    }

    async updateStatus(order: Order): Promise<Order> {
        const { id, status } = order
        await this.repository.update(id, { status })
        return order       
    }       
}

export { OrdersRepositoryPostgres }