import { FindByIdOrderUseCase } from "../../../application/useCases/orders/findByIdOrder/FindByIdOrderUseCase";
import { OutputFindOrderDTO } from "../../../application/dtos/orders/IFindOrderDTO";

class FindByIdOrderController {
    
    constructor(private findByIdOrderUseCase: FindByIdOrderUseCase){}

    async handler(id: number): Promise<OutputFindOrderDTO> {
        return await this.findByIdOrderUseCase.execute(id);       
    }
}

export { FindByIdOrderController }