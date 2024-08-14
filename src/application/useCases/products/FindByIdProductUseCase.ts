import { DataSource } from "typeorm"
import { IProductsGateway } from "../../../communication/gateways/IProductsGateway"
import { ProductEntity } from "../../../infra/datasource/typeorm/entities/ProductEntity"
import { ProductsRepositoryPostgres } from "../../../infra/datasource/typeorm/postgres/ProductsRepositoryPostgres"
import { OutputFindProductDTO } from "../../dtos/products/IFindProductDTO"

class FindByIdProductUseCase {

    private productsRepository: IProductsGateway
    
    constructor(
        private dataSource: DataSource        
    ){
        this.productsRepository = new ProductsRepositoryPostgres(this.dataSource.getRepository(ProductEntity))     
    }
    async execute(id: number): Promise<OutputFindProductDTO> {
        const product = await this.productsRepository.findById(id)

        if (!product) {
            throw new Error(`Product ${id} not found`)
        }

        return {
            id: product.id,
            name: product.name,
            code: product.code,
            description: product.description,
            price: product.price,
            image: product.image,
            categoryId: product.categoryId                       
        }
    }
}

export { FindByIdProductUseCase }