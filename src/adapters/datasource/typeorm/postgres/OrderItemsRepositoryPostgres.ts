import { Repository } from "typeorm"
import { AppDataSource } from ".."
import { IOrderItemsGateway } from "../../../../communication/gateways/IOrderItemsGateway"
import { OrderItem } from "../../../../core/entities/OrderItem"
import { OrderItemEntity } from "../entities/OrderItemEntity"

class OrderItemsRepositoryPostgres implements IOrderItemsGateway{

    private repository: Repository<OrderItem>

    constructor(){
        this.repository = AppDataSource.getRepository(OrderItemEntity)
    }

    async create(orderItem: OrderItem): Promise<OrderItem> {
        const orderItemCreated = await this.repository.save(orderItem)
        return orderItemCreated        
    }

    async createAll(orderItems: OrderItem[]): Promise<OrderItem[]> {
        const orderItemsCreated = await this.repository.save(orderItems)
        return orderItemsCreated        
    }
    
    async list(): Promise<OrderItem[]> {
        const all = await this.repository.find()
        return all
    }
    
    async findById(id: number): Promise<OrderItem> {
        const orderItemFound = await this.repository.findOne( { where: { id }})
        return orderItemFound
    }
}

export { OrderItemsRepositoryPostgres }