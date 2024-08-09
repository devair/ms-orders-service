import { DeleteProductUseCase } from "../../../application/useCases/products/deleteProduct/DeleteProductUseCase"

class DeleteProductController {
    
    constructor(private deleteProductUseCase: DeleteProductUseCase){}

    async handler(id: number): Promise<boolean> {        

        return await this.deleteProductUseCase.execute(id)
    }
}

export { DeleteProductController }