import { DataSource } from "typeorm"
import { ICustomersGateway } from "../../../../communication/gateways/ICustomersGateway"
import { CustomerEntity } from "../../../../infra/datasource/typeorm/entities/CustomerEntity"
import { CustomersRepositoryPostgres } from "../../../../infra/datasource/typeorm/postgres/CustomersRepositoryPostgres"
import { OutputFindCustomerDTO } from "../../../dtos/customers/IFindCustomerDTO"

class FindByCpfCustomerUseCase {

    private customersRepository: ICustomersGateway

    constructor(
        private dataSource: DataSource        
    ){
        this.customersRepository = new CustomersRepositoryPostgres(this.dataSource.getRepository(CustomerEntity))
    }

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