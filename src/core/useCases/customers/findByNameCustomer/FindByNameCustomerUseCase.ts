import { ICustomersGateway } from "../../../../communication/gateways/ICustomersGateway"
import { OutputFindCustomerDTO } from "../findByIdCustomer/IFindCustomerDTO"


class FindByNameCustomerUseCase {

    constructor(private customersRepository: ICustomersGateway){}

    async execute(name: string): Promise<OutputFindCustomerDTO[]> {
        const customers = await this.customersRepository.findByName(name)

        if(!customers){
            throw new Error(`Customer's ${name} not found`)
        }
        const output = customers.map((elem) => ({
            id: elem.id,
            name: elem.name,                    
            cpf: elem.cpf,
            email: elem.cpf,
            phone: elem.phone
        }))

        return output
    }
}

export { FindByNameCustomerUseCase }