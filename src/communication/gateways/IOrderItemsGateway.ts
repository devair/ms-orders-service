import { OrderItem } from "../../core/entities/OrderItem"

interface IOrderItemsGateway {

    create(orderItem: OrderItem): Promise<OrderItem>
    
    createAll(orderItems: OrderItem[]): Promise<OrderItem[]>

    list(): Promise<OrderItem[]>

    findById(id: number): Promise<OrderItem>
    
    findByOrderId(orderId: number): Promise<OrderItem[]>
}

export { IOrderItemsGateway }