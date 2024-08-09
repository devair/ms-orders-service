import { OutputFindCustomerDTO } from "../../../application/dtos/customers/IFindCustomerDTO"
import { ListCustomersUseCase } from "../../../application/useCases/customers/listCustomers/ListCustomersUseCase"
import { ICustomersGateway } from "../../gateways/ICustomersGateway"

class ListCustomersController{

    constructor(private customersRepository: ICustomersGateway){}

    async handler(): Promise<OutputFindCustomerDTO[]>{

        const listCustomersUseCase = new ListCustomersUseCase(this.customersRepository)

        return await listCustomersUseCase.execute()
    }

}

export { ListCustomersController }