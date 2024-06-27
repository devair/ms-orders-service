import { Order } from "../../core/entities/Order"

interface IOrdersGateway {

    create( order: Order ): Promise<Order>

    list(): Promise<Order[]>
        
    findById(id: number): Promise<Order>

    updateStatus(order: Order ): Promise<Order>
}

export { IOrdersGateway }