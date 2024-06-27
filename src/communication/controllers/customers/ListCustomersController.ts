import { OutputFindCustomerDTO } from "../../../core/useCases/customers/findByIdCustomer/IFindCustomerDTO"
import { ListCustomersUseCase } from "../../../core/useCases/customers/listCustomers/ListCustomersUseCase"
import { ICustomersGateway } from "../../gateways/ICustomersGateway"

class ListCustomersController{

    constructor(private customersRepository: ICustomersGateway){}

    async handler(): Promise<OutputFindCustomerDTO[]>{

        const listCustomersUseCase = new ListCustomersUseCase(this.customersRepository)

        return await listCustomersUseCase.execute()
    }

}

export { ListCustomersController }