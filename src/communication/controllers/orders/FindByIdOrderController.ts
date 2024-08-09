import { FindByIdOrderUseCase } from "../../../application/useCases/orders/findByIdOrder/FindByIdOrderUseCase";
import { OutputFindOrderDTO } from "../../../application/dtos/orders/IFindOrderDTO";
import { IOrdersGateway } from "../../gateways/IOrdersGateway";

class FindByIdOrderController {
    
    constructor(private ordersRepository: IOrdersGateway){}

    async handler(id: number): Promise<OutputFindOrderDTO> {

        const findByIdOrderUseCase = new FindByIdOrderUseCase(this.ordersRepository)        

        return await findByIdOrderUseCase.execute(id);       

    }
}

export { FindByIdOrderController }