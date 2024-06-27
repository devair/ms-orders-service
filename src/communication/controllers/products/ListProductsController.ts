import { OutputFindProductDTO } from "../../../core/useCases/products/findByIdProduct/IFindProductDTO";
import { ListProductsUseCase } from "../../../core/useCases/products/listProducts/ListProductsUseCase";
import { IProductsGateway } from "../../gateways/IProductsGateway";

class ListProductsController {
    
    constructor(private productsRepository: IProductsGateway){}

    async handler(): Promise<OutputFindProductDTO[]> {

        const listProductsUseCase = new ListProductsUseCase(this.productsRepository)        

        return await listProductsUseCase.execute();       

    }
}

export { ListProductsController }