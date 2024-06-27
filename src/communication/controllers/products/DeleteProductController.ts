import { DeleteProductUseCase } from "../../../core/useCases/products/deleteProduct/DeleteProductUseCase"
import { IProductsGateway } from "../../gateways/IProductsGateway"

class DeleteProductController {
    
    constructor(private productsRepository: IProductsGateway){}

    async handler(id: number): Promise<Boolean> {

        const deleteProductUseCase = new DeleteProductUseCase(this.productsRepository)       

        return await deleteProductUseCase.execute(id)
    }
}

export { DeleteProductController }