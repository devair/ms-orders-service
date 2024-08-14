import { OutputFindCustomerDTO } from "../../../application/dtos/customers/IFindCustomerDTO"
import { ListCustomersUseCase } from "../../../application/useCases/customers/ListCustomersUseCase"

class ListCustomersController{

    constructor(private listCustomersUseCase: ListCustomersUseCase){}

    async handler(): Promise<OutputFindCustomerDTO[]>{

        return await this.listCustomersUseCase.execute()
    }

}

export { ListCustomersController }