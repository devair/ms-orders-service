import { FindByIdProductUseCase } from "../../../application/useCases/products/findByIdProduct/FindByIdProductUseCase";
import { OutputFindProductDTO } from "../../../application/dtos/products/IFindProductDTO";
import { IProductsGateway } from "../../gateways/IProductsGateway";

class FindByIdProductController {
    
    constructor(private productsRepository: IProductsGateway){}

    async handler(id: number): Promise<OutputFindProductDTO> {

        const findByIdProductUseCase = new FindByIdProductUseCase(this.productsRepository)        

        return await findByIdProductUseCase.execute(id);       

    }
}

export { FindByIdProductController }