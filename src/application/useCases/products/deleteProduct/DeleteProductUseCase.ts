import { DataSource } from "typeorm"
import { IProductsGateway } from "../../../../communication/gateways/IProductsGateway"
import { ProductEntity } from "../../../../infra/datasource/typeorm/entities/ProductEntity"
import { ProductsRepositoryPostgres } from "../../../../infra/datasource/typeorm/postgres/ProductsRepositoryPostgres"

class DeleteProductUseCase {

    private productsRepository: IProductsGateway
    
    constructor(
        private dataSource: DataSource        
    ){
        this.productsRepository = new ProductsRepositoryPostgres(this.dataSource.getRepository(ProductEntity))     
    }

    async execute(id: number): Promise<boolean> {
        return await this.productsRepository.delete(id)
    }
}

export { DeleteProductUseCase }