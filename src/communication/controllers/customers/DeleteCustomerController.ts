import { InputCustomerDeleteDTO, OutputCustomerDeleteDTO } from "../../../application/dtos/customers/IDeleteCustomerDTO"
import { DeleteCustomerUseCase } from "../../../application/useCases/customers/DeleteCustomerUseCase"

class DeleteCustomerController {

    constructor(private createCustomerUseCase: DeleteCustomerUseCase){}

    async handler({ name, address, phone }: InputCustomerDeleteDTO): Promise<OutputCustomerDeleteDTO> {        
        
        return await this.createCustomerUseCase.execute({ name, address, phone })
    }
}

export { DeleteCustomerController }