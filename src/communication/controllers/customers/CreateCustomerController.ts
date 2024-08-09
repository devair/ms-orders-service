import { CreateCustomerUseCase } from "../../../application/useCases/customers/createCustomer/CreateCustomerUseCase"
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from "../../../application/dtos/customers/ICreateCustomerDTO"

class CreateCustomerController {

    constructor(private createCustomerUseCase: CreateCustomerUseCase){}

    async handler({ name, email, cpf, phone }: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {        
        
        return await this.createCustomerUseCase.execute({ name, email, cpf, phone })
    }
}

export { CreateCustomerController }