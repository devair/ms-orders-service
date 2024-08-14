import { FindByIdProductUseCase } from "../../../application/useCases/products/FindByIdProductUseCase";
import { OutputFindProductDTO } from "../../../application/dtos/products/IFindProductDTO";

class FindByIdProductController {
    
    constructor(private findByIdProductUseCase : FindByIdProductUseCase){}

    async handler(id: number): Promise<OutputFindProductDTO> {
        
        return await this.findByIdProductUseCase.execute(id);       

    }
}

export { FindByIdProductController }