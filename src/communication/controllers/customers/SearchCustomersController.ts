import { FindByCpfCustomerUseCase } from "../../../core/useCases/customers/findByCpfCustomer/FindByCpfCustomerUseCase"
import { OutputFindCustomerDTO } from "../../../core/useCases/customers/findByIdCustomer/IFindCustomerDTO"
import { FindByNameCustomerUseCase } from "../../../core/useCases/customers/findByNameCustomer/FindByNameCustomerUseCase"
import { ICustomersGateway } from "../../gateways/ICustomersGateway"

class SearchCustomersController {

    constructor(private customersRepository: ICustomersGateway){}

    async handler( cpf: string , name: string ) : Promise<OutputFindCustomerDTO[]>{
        
        if(!cpf && !name ){
            throw Error('Missing parameters: name OR cpf')
        }

        const findByCpfCustomerUseCase = new FindByCpfCustomerUseCase(this.customersRepository)
        const findByNameCustomerUseCase = new FindByNameCustomerUseCase(this.customersRepository)
        let customers =[]
        if(cpf){
            const customer = await findByCpfCustomerUseCase.execute( cpf )

            if(customer) {
                customers.push(customer)
            }
        }
        else if( name){
            customers = await findByNameCustomerUseCase.execute( name )            
        }
        return customers
    }
}

export { SearchCustomersController }