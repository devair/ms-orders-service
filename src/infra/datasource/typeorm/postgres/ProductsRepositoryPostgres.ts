import { Repository } from "typeorm"
import { IProductsGateway } from "../../../../communication/gateways/IProductsGateway"
import { Product } from "../../../../core/entities/Product"
import { InputCreateProductDTO } from "../../../../application/dtos/products/ICreateProductDTO"

class ProductsRepositoryPostgres implements IProductsGateway {

    constructor(
        private repository: Repository<Product>
    ){}

    async create({ code, name, description, categoryId, price, image }: InputCreateProductDTO): Promise<Product> {
        const product = this.repository.create({ name, code, description, 
            categoryId, price, image })

        const productCreated = await this.repository.save(product)

        return productCreated
    }
    
    async list(): Promise<Product[]> {
        const all = await this.repository.find()

        return all
    }

    async findById(id: number): Promise<Product> {
        const product = await this.repository.findOne( {where: { id }})
        return product
    }

    async findByCode(code: string): Promise<Product> {
        const product = await this.repository.findOne({where: { code }})
        return product
    }

    async findByName(name: string): Promise<Product[]> {
        const products = await this.repository
        .createQueryBuilder('product')
        .where('LOWER(name) LIKE :pattern', { pattern: `%${ name.toLowerCase() }%` })                                    
        .getMany()

        return products
    }

    async delete(id: number): Promise<boolean> {
        const deleteResult = await this.repository.delete(id)

        return deleteResult.affected > 0
    }

    async update(product: Product): Promise<Product> {
        return await this.repository.save(product)
    }

    async findByCategory(name: string): Promise<Product[]> {
        const products = await this.repository
        .createQueryBuilder('product')        
        .innerJoinAndSelect('product.category', 'category', 'LOWER(category.name) LIKE :pattern', 
        {
            pattern : `%${ name.toLowerCase() }%`
        })        
        .getMany()

        return products
    }
}

export { ProductsRepositoryPostgres }