import { OutputFindOrderDTO } from "../../../application/dtos/orders/IFindOrderDTO"
import { ListOrdersUseCase } from "../../../application/useCases/orders/ListOrdersUseCase"

class ListOrdersController {

    constructor(private listOrdersUseCase: ListOrdersUseCase){}

    async handler(): Promise<OutputFindOrderDTO[]>{
        return await this.listOrdersUseCase.execute()
    }

}

export { ListOrdersController }