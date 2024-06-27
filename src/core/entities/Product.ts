import { Category } from './Category';
import { Order } from './Order';
import { OrderItem } from './OrderItem';
class Product {
    
    id: number
    code: string
    name: string
    description: string
    category: Category
    orderItems: OrderItem[]
    orders: Order []
    categoryId: number
    price?: number
    image: string
    createdAt: Date    
}

export { Product }