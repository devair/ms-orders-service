import { CreateProductUseCase } from "../../../core/useCases/products/createProduct/CreateProductUseCase";
import { InputCreateProductDTO, OutputCreateProductDTO } from "../../../core/useCases/products/createProduct/ICreateProductDTO";
import { ICategoriesGateway } from "../../gateways/ICategoriesGateway";
import { IProductsGateway } from "../../gateways/IProductsGateway";

class CreateProductController {
    
    constructor(private productsRepository: IProductsGateway,
        private categoriesRepository: ICategoriesGateway){}

    async handler(createProduct: InputCreateProductDTO): Promise<OutputCreateProductDTO>{

        const categoryUseCase = new CreateProductUseCase(this.productsRepository, this.categoriesRepository )
        
        return await categoryUseCase.execute(createProduct);       
    }
}

export { CreateProductController }