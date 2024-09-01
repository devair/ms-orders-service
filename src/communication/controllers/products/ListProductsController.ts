import { OutputFindProductDTO } from "../../../application/dtos/products/IFindProductDTO";
import { ListProductsUseCase } from "../../../application/useCases/products/ListProductsUseCase";

class ListProductsController {
    
    constructor(private listProductsUseCase: ListProductsUseCase){}

    async handler(): Promise<OutputFindProductDTO[]> {

        return await this.listProductsUseCase.execute();       

    }
}

export { ListProductsController }