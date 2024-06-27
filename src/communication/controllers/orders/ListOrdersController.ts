import { OutputFindOrderDTO } from "../../../core/useCases/orders/findByIdOrder/IFindOrderDTO"
import { ListOrdersUseCase } from "../../../core/useCases/orders/listOrders/ListOrdersUseCase"
import { IOrdersGateway } from "../../gateways/IOrdersGateway"

class ListOrdersController {

    constructor(private ordersRepository: IOrdersGateway){}

    async handler(): Promise<OutputFindOrderDTO[]>{

        const listOrdersUseCase = new ListOrdersUseCase(this.ordersRepository)

        return await listOrdersUseCase.execute()
    }

}

export { ListOrdersController }