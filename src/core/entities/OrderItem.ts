import { Order } from './Order'
import { Product } from './Product'

class OrderItem {

    id: number
    order: Order
    orderId: number
    product: Product
    productId: number
    quantity: number
    unitPrice: number    
    createdAt: Date

    constructor(order: Order, product: Product, quantity: number, unitPrice: number){
        this.order = order
        this.product = product
        this.quantity = quantity
        this.unitPrice = unitPrice
    }
}

export { OrderItem }