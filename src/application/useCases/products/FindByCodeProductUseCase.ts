import { DataSource } from "typeorm"
import { IProductsGateway } from "../../../communication/gateways/IProductsGateway"
import { ProductEntity } from "../../../infra/datasource/typeorm/entities/ProductEntity"
import { ProductsRepositoryPostgres } from "../../../infra/datasource/typeorm/postgres/ProductsRepositoryPostgres"
import { OutputFindProductDTO } from "../../dtos/products/IFindProductDTO"

class FindByCodeProductUseCase {

    private productsRepository: IProductsGateway
    
    constructor(
        private dataSource: DataSource        
    ){
        this.productsRepository = new ProductsRepositoryPostgres(this.dataSource.getRepository(ProductEntity))     
    }
    async execute(code: string): Promise<OutputFindProductDTO> {

        const product = await this.productsRepository.findByCode(code)

        if(!product){
            throw new Error(`Product ${code} not found`)
        }

        return {
            id: product.id,
            name: product.name,
            code: product.code,
            description: product.description,
            categoryId: product.categoryId,
            price: product.price,
            image: product.image
        }
    }
}

export { FindByCodeProductUseCase }