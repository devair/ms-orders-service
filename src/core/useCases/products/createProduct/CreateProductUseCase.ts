import { ICategoriesGateway } from "../../../../communication/gateways/ICategoriesGateway";
import { IProductsGateway } from "../../../../communication/gateways/IProductsGateway";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./ICreateProductDTO";

class CreateProductUseCase {

    constructor(private productsRepository: IProductsGateway,
        private categoriesRepository: ICategoriesGateway){}

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
            category: {
                id: categoryFound.id,
                name: categoryFound.name,
                description: categoryFound.description
            }
        }
    }
}

export { CreateProductUseCase }