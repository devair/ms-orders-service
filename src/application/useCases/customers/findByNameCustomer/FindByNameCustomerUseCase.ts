import { DataSource } from "typeorm"
import { ICustomersGateway } from "../../../../communication/gateways/ICustomersGateway"
import { CustomerEntity } from "../../../../infra/datasource/typeorm/entities/CustomerEntity"
import { CustomersRepositoryPostgres } from "../../../../infra/datasource/typeorm/postgres/CustomersRepositoryPostgres"
import { OutputFindCustomerDTO } from "../../../dtos/customers/IFindCustomerDTO"


class FindByNameCustomerUseCase {

    private customersRepository: ICustomersGateway

    constructor(
        private dataSource: DataSource        
    ){
        this.customersRepository = new CustomersRepositoryPostgres(this.dataSource.getRepository(CustomerEntity))
    }

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