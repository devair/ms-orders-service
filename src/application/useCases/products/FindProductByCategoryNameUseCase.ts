import { DataSource } from "typeorm"
import { IProductsGateway } from "../../../communication/gateways/IProductsGateway"
import { ProductEntity } from "../../../infra/datasource/typeorm/entities/ProductEntity"
import { ProductsRepositoryPostgres } from "../../../infra/datasource/typeorm/postgres/ProductsRepositoryPostgres"
import { OutputFindProductDTO } from "../../dtos/products/IFindProductDTO"

class FindProductByCategoryNameUseCase {

    private productsRepository: IProductsGateway
    
    constructor(
        private dataSource: DataSource        
    ){
        this.productsRepository = new ProductsRepositoryPostgres(this.dataSource.getRepository(ProductEntity))     
    }
    async execute(name: string): Promise<OutputFindProductDTO[]> {
        const products = await this.productsRepository.findByCategory(name)
        
        const output = products.map((elem) => ({
            id: elem.id,
            name: elem.name,
            code: elem.code,
            description: elem.description,
            price: elem.price,
            image: elem.image           
        }))

        return output
    }
}

export { FindProductByCategoryNameUseCase }