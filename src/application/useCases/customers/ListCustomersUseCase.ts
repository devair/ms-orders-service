import { DataSource } from "typeorm"
import { ICustomersGateway } from "../../../communication/gateways/ICustomersGateway"
import { CustomerEntity } from "../../../infra/datasource/typeorm/entities/CustomerEntity"
import { CustomersRepositoryPostgres } from "../../../infra/datasource/typeorm/postgres/CustomersRepositoryPostgres"
import { OutputFindCustomerDTO } from "../../dtos/customers/IFindCustomerDTO"

class ListCustomersUseCase {
    
    private customersRepository: ICustomersGateway

    constructor(
        private dataSource: DataSource        
    ){
        this.customersRepository = new CustomersRepositoryPostgres(this.dataSource.getRepository(CustomerEntity))
    }

    async execute(): Promise<OutputFindCustomerDTO[]>{
        const customers = await this.customersRepository.list()

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
export { ListCustomersUseCase }