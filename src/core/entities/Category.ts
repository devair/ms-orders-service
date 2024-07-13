import { Product } from "./Product"

class Category {
    
    readonly id: number
    name: string
    description: string
    products: Product[]
    readonly createdAt: Date
}
export { Category }
