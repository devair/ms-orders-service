import { Product } from "./Product"

class Category {
    
    readonly id: number
    readonly name: string
    readonly description: string
    readonly products: Product[]
    readonly createdAt: Date

    constructor(id: number, name: string, description: string){

        if(name.trim()=='') {
            throw new Error('Name should be informed')
        }

        if(description.trim()=='') {
            throw new Error('Description should be informed')
        }

        this.id = id
        this.name = name
        this.description = description 
        this.products = []
        this.createdAt = new Date()       
    }
}
export { Category }
