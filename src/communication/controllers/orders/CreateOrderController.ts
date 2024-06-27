import { CreateOrderUseCase } from "../../../core/useCases/orders/createOrderUseCase/CreateOrderUseCase"
import { InputCreateOrderDTO, OutputCreateOrderDTO } from "../../../core/useCases/orders/createOrderUseCase/ICreateOrderDTO"
import { ICustomersGateway } from "../../gateways/ICustomersGateway"
import { IOrderItemsGateway } from "../../gateways/IOrderItemsGateway"
import { IOrdersGateway } from "../../gateways/IOrdersGateway"
import { IProductsGateway } from "../../gateways/IProductsGateway"

class CreateOrderController {

    constructor(private ordersRepository: IOrdersGateway,
        private orderItemsRepository: IOrderItemsGateway,
        private customersRepository: ICustomersGateway,
        private productsRepository: IProductsGateway){}

    async handler({ customer, orderItems }: InputCreateOrderDTO ): Promise<OutputCreateOrderDTO> {
        const createOrderUseCase = new CreateOrderUseCase(this.ordersRepository, this.orderItemsRepository,
            this.customersRepository, this.productsRepository)
        
        const order = await createOrderUseCase.execute({customer, orderItems})
        
        return order
    }
}

export { CreateOrderController }