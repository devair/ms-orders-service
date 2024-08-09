import { CreateOrderUseCase } from "../../../application/useCases/orders/createOrderUseCase/CreateOrderUseCase"
import { InputCreateOrderDTO, OutputCreateOrderDTO } from "../../../application/dtos/orders/ICreateOrderDTO"

class CreateOrderController {

    constructor(private createOrderUseCase: CreateOrderUseCase){}

    async handler({ customer, orderItems }: InputCreateOrderDTO ): Promise<OutputCreateOrderDTO> {

        const order = await this.createOrderUseCase.execute({customer, orderItems})
        
        return order
    }
}

export { CreateOrderController }