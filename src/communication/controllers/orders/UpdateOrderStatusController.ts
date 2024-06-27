import { InputUpdateOrderStatusDTO, OutputUpdateOrderStatusDTO } from "../../../core/useCases/orders/updateStatus/IUpdateOrderStatusDTO";
import { UpdateOrderStatusUseCase } from "../../../core/useCases/orders/updateStatus/UpdateOrderStatusUseCase";
import { IOrdersGateway } from "../../gateways/IOrdersGateway";

class UpdateOrderStatusController {
    
    constructor(private ordersRepository: IOrdersGateway ) {}

    async handler({ id, status }: InputUpdateOrderStatusDTO ): Promise<OutputUpdateOrderStatusDTO> {

        const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(this.ordersRepository)        

        return await updateOrderStatusUseCase.execute({ id, status});       
    }
}

export { UpdateOrderStatusController }