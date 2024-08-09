import { FindByIdCustomerUseCase } from "../../../application/useCases/customers/findByIdCustomer/FindByIdCustomerUseCase"
import { OutputFindCustomerDTO } from "../../../application/useCases/customers/findByIdCustomer/IFindCustomerDTO"
import { ICustomersGateway } from "../../gateways/ICustomersGateway"

class FindByIdCustomerController{

    constructor(private customersRepository: ICustomersGateway){}

    async handler(id: number): Promise<OutputFindCustomerDTO>{
        
        const findByIdCustomerUseCase = new FindByIdCustomerUseCase(this.customersRepository)
        
        return await findByIdCustomerUseCase.execute(id)
    }
}

export {FindByIdCustomerController}