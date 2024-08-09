import { DataSource } from "typeorm"
import { ICategoriesGateway } from "../../../../communication/gateways/ICategoriesGateway";
import { IProductsGateway } from "../../../../communication/gateways/IProductsGateway";
import { CategoryEntity } from "../../../../infra/datasource/typeorm/entities/CategoryEntity"
import { ProductEntity } from "../../../../infra/datasource/typeorm/entities/ProductEntity"
import { CategoriesRepositoryPostgres } from "../../../../infra/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { ProductsRepositoryPostgres } from "../../../../infra/datasource/typeorm/postgres/ProductsRepositoryPostgres"
import { InputCreateProductDTO, OutputCreateProductDTO } from "../../../dtos/products/ICreateProductDTO"

class CreateProductUseCase {
    
    private productsRepository: IProductsGateway
    private categoriesRepository: ICategoriesGateway

    constructor(
        private dataSource: DataSource        
    ){
        this.productsRepository = new ProductsRepositoryPostgres(this.dataSource.getRepository(ProductEntity))
        this.categoriesRepository = new CategoriesRepositoryPostgres(this.dataSource.getRepository(CategoryEntity))
    }

    async execute ({code, name, description, categoryId, price, image }: InputCreateProductDTO): Promise<OutputCreateProductDTO>{

        const productAlreadyExists = await this.productsRepository.findByCode(code);

        if(productAlreadyExists){
            throw new Error(`Product ${code} already exists`);
        }        

        const categoryFound = await this.categoriesRepository.findById(categoryId)
        
        if (!categoryFound) {
            throw new Error(`Category ${categoryId} not found`)
        }

        const product = await this.productsRepository.create({
            code, name, description, categoryId: categoryFound.id, price, image
        })

        return {
            id: product.id,
            name: product.name,
            code: product.code,
            description: product.description,
            price: product.price,
            image: product.image,
            categoryId: categoryFound.id,
            category: {
                id: categoryFound.id,
                name: categoryFound.name,
                description: categoryFound.description
            }
        }
    }
}

export { CreateProductUseCase }