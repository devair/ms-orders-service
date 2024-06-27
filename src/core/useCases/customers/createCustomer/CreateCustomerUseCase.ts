import { ICustomersGateway } from "../../../../communication/gateways/ICustomersGateway";
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from "./ICreateCustomerDTO";


class CreateCustomerUseCase {
    
    constructor(private customersRepository: ICustomersGateway){}

    async execute({ name, email, cpf, phone }: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {

        const customerAlreadyExists = await this.customersRepository.findByCpf(cpf)

        if (customerAlreadyExists) {
            throw new Error(`Customer's cpf ${cpf} already exists`)
        }

        const customer = await this.customersRepository.create({ name, cpf, email, phone })

        return { 
            id: customer.id,
            name: customer.name,                    
            cpf: customer.cpf,
            email: customer.cpf,
            phone: customer.phone        
        } 
    }       
}

export { CreateCustomerUseCase }