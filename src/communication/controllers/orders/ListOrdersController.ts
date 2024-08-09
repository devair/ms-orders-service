import { OutputFindOrderDTO } from "../../../application/useCases/orders/findByIdOrder/IFindOrderDTO"
import { ListOrdersUseCase } from "../../../application/useCases/orders/listOrders/ListOrdersUseCase"
import { IOrdersGateway } from "../../gateways/IOrdersGateway"

class ListOrdersController {

    constructor(private ordersRepository: IOrdersGateway){}

    async handler(): Promise<OutputFindOrderDTO[]>{

        const listOrdersUseCase = new ListOrdersUseCase(this.ordersRepository)

        return await listOrdersUseCase.execute()
    }

}

export { ListOrdersController }