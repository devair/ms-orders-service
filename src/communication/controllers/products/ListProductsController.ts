import { OutputFindProductDTO } from "../../../application/dtos/products/IFindProductDTO";
import { ListProductsUseCase } from "../../../application/useCases/products/listProducts/ListProductsUseCase";
import { IProductsGateway } from "../../gateways/IProductsGateway";

class ListProductsController {
    
    constructor(private productsRepository: IProductsGateway){}

    async handler(): Promise<OutputFindProductDTO[]> {

        const listProductsUseCase = new ListProductsUseCase(this.productsRepository)        

        return await listProductsUseCase.execute();       

    }
}

export { ListProductsController }