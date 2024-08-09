import { ICustomersGateway } from "../../../../communication/gateways/ICustomersGateway"
import { OutputFindCustomerDTO } from "../findByIdCustomer/IFindCustomerDTO"

class FindByCpfCustomerUseCase {

    constructor(private customersRepository: ICustomersGateway){}

    async execute(cpf: string): Promise<OutputFindCustomerDTO> {

        if(!cpf){
            throw new Error(`Missing parameter: cpf`)
        }

        const customer = await this.customersRepository.findByCpf(cpf)

        if(!customer){
            throw new Error(`Customer's ${cpf} not found`)
        }

        return {
            id: customer.id,
            name: customer.name,                    
            cpf: customer.cpf,
            email: customer.cpf,
            phone: customer.phone
        }
    }
}

export { FindByCpfCustomerUseCase }