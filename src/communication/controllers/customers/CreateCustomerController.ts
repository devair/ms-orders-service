import { CreateCustomerUseCase } from "../../../core/useCases/customers/createCustomer/CreateCustomerUseCase"
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from "../../../core/useCases/customers/createCustomer/ICreateCustomerDTO"
import { ICustomersGateway } from "../../gateways/ICustomersGateway"

class CreateCustomerController {

    constructor(private customersRepository: ICustomersGateway){}

    async handler({ name, email, cpf, phone }: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {

        const createCustomerUseCase = new CreateCustomerUseCase(this.customersRepository)
        
        return await createCustomerUseCase.execute({ name, email, cpf, phone })
    }
}

export { CreateCustomerController }