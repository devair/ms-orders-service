import { FindByIdCustomerUseCase } from "../../../application/useCases/customers/FindByIdCustomerUseCase"
import { OutputFindCustomerDTO } from "../../../application/dtos/customers/IFindCustomerDTO"

class FindByIdCustomerController{

    constructor(private findByIdCustomerUseCase: FindByIdCustomerUseCase){}

    async handler(id: number): Promise<OutputFindCustomerDTO>{
                
        return await this.findByIdCustomerUseCase.execute(id)
    }
}

export {FindByIdCustomerController}