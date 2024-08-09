import { DataSource } from "typeorm"
import { ICustomersGateway } from "../../../../communication/gateways/ICustomersGateway";
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from "../../../dtos/customers/ICreateCustomerDTO";
import { CustomersRepositoryPostgres } from "../../../../infra/datasource/typeorm/postgres/CustomersRepositoryPostgres"
import { CustomerEntity } from "../../../../infra/datasource/typeorm/entities/CustomerEntity"


class CreateCustomerUseCase {

    private customersRepository: ICustomersGateway

    constructor(
        private dataSource: DataSource        
    ){
        this.customersRepository = new CustomersRepositoryPostgres(this.dataSource.getRepository(CustomerEntity))
    }

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