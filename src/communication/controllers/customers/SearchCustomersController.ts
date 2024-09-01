import { FindByCpfCustomerUseCase } from "../../../application/useCases/customers/FindByCpfCustomerUseCase"
import { OutputFindCustomerDTO } from "../../../application/dtos/customers/IFindCustomerDTO"
import { FindByNameCustomerUseCase } from "../../../application/useCases/customers/FindByNameCustomerUseCase"

class SearchCustomersController {

    constructor(
        private findByCpfCustomerUseCase: FindByCpfCustomerUseCase,
        private findByNameCustomerUseCase: FindByNameCustomerUseCase,
    ){}

    async handler( cpf: string , name: string ) : Promise<OutputFindCustomerDTO[]>{
        
        if(!cpf && !name ){
            throw Error('Missing parameters: name OR cpf')
        }

        let customers =[]
        if(cpf){
            const customer = await this.findByCpfCustomerUseCase.execute( cpf )

            if(customer) {
                customers.push(customer)
            }
        }
        else if( name){
            customers = await this.findByNameCustomerUseCase.execute( name )            
        }
        return customers
    }
}

export { SearchCustomersController }