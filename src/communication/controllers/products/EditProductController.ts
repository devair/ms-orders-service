import { EditProductUseCase } from "../../../application/useCases/products/EditProductUseCase";
import { InputUpdateProductDTO } from "../../../application/dtos/products/IEditProductDTO";

class EditProductController {
    
    constructor(private editProductUseCase : EditProductUseCase){}

    async handler({id, code, name, description, categoryId, price, image }: InputUpdateProductDTO): Promise<void> {
        await this.editProductUseCase.execute({ id, code, name, description, categoryId, price, image});       
    }
}

export { EditProductController }