import { FindByIdOrderUseCase } from "../../../core/useCases/orders/findByIdOrder/FindByIdOrderUseCase";
import { OutputFindOrderDTO } from "../../../core/useCases/orders/findByIdOrder/IFindOrderDTO";
import { IOrdersGateway } from "../../gateways/IOrdersGateway";

class FindByIdOrderController {
    
    constructor(private ordersRepository: IOrdersGateway){}

    async handler(id: number): Promise<OutputFindOrderDTO> {

        const findByIdOrderUseCase = new FindByIdOrderUseCase(this.ordersRepository)        

        return await findByIdOrderUseCase.execute(id);       

    }
}

export { FindByIdOrderController }