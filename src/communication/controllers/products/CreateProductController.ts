import { CreateProductUseCase } from "../../../application/useCases/products/CreateProductUseCase";
import { InputCreateProductDTO, OutputCreateProductDTO } from "../../../application/dtos/products/ICreateProductDTO";

class CreateProductController {
    
    constructor(private createProductUseCase: CreateProductUseCase){}

    async handler(createProduct: InputCreateProductDTO): Promise<OutputCreateProductDTO>{

        return await this.createProductUseCase.execute(createProduct);       
    }
}

export { CreateProductController }