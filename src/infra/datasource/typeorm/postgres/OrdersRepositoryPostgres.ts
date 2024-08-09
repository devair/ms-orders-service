import { Repository } from "typeorm"
import { IOrdersGateway } from "../../../../communication/gateways/IOrdersGateway"
import { Order } from "../../../../core/entities/Order"

class OrdersRepositoryPostgres implements IOrdersGateway{
    
    constructor(
        private readonly repository: Repository<Order>
    ){}

    async create(order: Order): Promise<Order> {        
        const orderCreated = await this.repository.save(order)
        return orderCreated
    }

    async list(): Promise<Order[]> {
        const all = await this.repository
        .createQueryBuilder('order')
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