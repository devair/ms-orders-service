import { DataSource } from "typeorm"
import { ICustomersGateway } from "../../../communication/gateways/ICustomersGateway"
import { CustomerEntity } from "../../../infra/datasource/typeorm/entities/CustomerEntity"
import { CustomersRepositoryPostgres } from "../../../infra/datasource/typeorm/postgres/CustomersRepositoryPostgres"
import { OutputFindCustomerDTO } from "../../dtos/customers/IFindCustomerDTO"


class FindByIdCustomerUseCase {

    private customersRepository: ICustomersGateway

    constructor(
        private dataSource: DataSource        
    ){
        this.customersRepository = new CustomersRepositoryPostgres(this.dataSource.getRepository(CustomerEntity))
    }

    async execute(id: number): Promise<OutputFindCustomerDTO> {
        const customer = await this.customersRepository.findById(id)

        if (!customer) {
            throw new Error(`Customer ${id} not found`)
        }

        return {
            id: customer.id,
            name: customer.name,
            cpf: customer.cpf,
            phone: customer.phone,
            email: customer.email
        }
    }
}

export { FindByIdCustomerUseCase }