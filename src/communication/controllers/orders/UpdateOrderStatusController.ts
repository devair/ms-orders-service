import { InputUpdateOrderStatusDTO, OutputUpdateOrderStatusDTO } from "../../../application/dtos/orders/IUpdateOrderStatusDTO";
import { UpdateOrderStatusUseCase } from "../../../application/useCases/orders/UpdateOrderStatusUseCase";

class UpdateOrderStatusController {
    
    constructor(private updateOrderStatusUseCase: UpdateOrderStatusUseCase ) {}

    async handler({ id, status }: InputUpdateOrderStatusDTO ): Promise<OutputUpdateOrderStatusDTO> {

        return await this.updateOrderStatusUseCase.execute({ id, status});       
    }
}

export { UpdateOrderStatusController }