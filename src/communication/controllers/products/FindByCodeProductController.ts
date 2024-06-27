import { FindByCodeProductUseCase } from "../../../core/useCases/products/findByCodeProduct/FindByCodeProductUseCase"
import { OutputFindProductDTO } from "../../../core/useCases/products/findByIdProduct/IFindProductDTO"
import { IProductsGateway } from "../../gateways/IProductsGateway"

class FindByCodeProductController {

    constructor(private productsRepository: IProductsGateway){}

    async handler(code: string): Promise<OutputFindProductDTO>{

        const findByCodeProductUseCase = new FindByCodeProductUseCase(this.productsRepository)        
        return await findByCodeProductUseCase.execute(code) 

    }
}

export { FindByCodeProductController }