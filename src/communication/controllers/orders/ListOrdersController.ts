import { OutputFindOrderDTO } from "../../../application/dtos/orders/IFindOrderDTO"
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