import { IOrdersGateway } from "../../../../communication/gateways/IOrdersGateway";
import { Order, OrderStatus } from "../../../../core/entities/Order"
import { InputUpdateOrderStatusDTO, OutputUpdateOrderStatusDTO } from "./IUpdateOrderStatusDTO";


class UpdateOrderStatusUseCase{
    
    constructor(private ordersRepository: IOrdersGateway ) {}
    
    async execute({ id, status }: InputUpdateOrderStatusDTO ): Promise<OutputUpdateOrderStatusDTO> {

        await this.ordersRepository.findById(id)
        let orderUpdate = new Order();
        const orderStatus : OrderStatus | string = status   

        if (!((Object.values(OrderStatus) as string[]).includes(orderStatus))) {
            throw new Error(`Order Status ${status} does not exist`)
        }

        Object.assign(orderUpdate, {
            id: id,
            status: orderStatus
        })

        const orderUpdated = await this.ordersRepository.updateStatus(orderUpdate)
            
        return { 
            id: orderUpdated.id,
            status: orderUpdated.status
        }
    }
}

export { UpdateOrderStatusUseCase }