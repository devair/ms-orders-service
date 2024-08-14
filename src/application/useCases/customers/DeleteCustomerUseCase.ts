import { DataSource } from "typeorm"
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from "../../dtos/customers/ICreateCustomerDTO";
import { CustomerDeleteEntity } from "../../../infra/datasource/typeorm/entities/CustomerDeleteEntity"
import { CustomerDeleteRepositoryPostgres } from "../../../infra/datasource/typeorm/postgres/CustomerDeleteRepositoryPostgres"
import { ICustomersDeleteGateway } from "../../../communication/gateways/ICustomersDeleteGateway"
import { CustomerDelete } from "../../../core/entities/CustomerDelete"
import { InputCustomerDeleteDTO, OutputCustomerDeleteDTO } from "../../dtos/customers/IDeleteCustomerDTO"
import { add } from "pactum/src/exports/reporter"


class DeleteCustomerUseCase {

    private customersRepository: ICustomersDeleteGateway

    constructor(
        private dataSource: DataSource        
    ){
        this.customersRepository = new CustomerDeleteRepositoryPostgres(this.dataSource.getRepository(CustomerDeleteEntity))
    }

    async execute({ name, address, phone }: InputCustomerDeleteDTO): Promise<OutputCustomerDeleteDTO> {    
        
        if(!name || !address || !phone){
            throw new Error("name or address or phone is missing")
        }

        const customer = new CustomerDelete(name, address, phone)
        const customerCreated = await this.customersRepository.create(customer)

        return {
            id: customerCreated.id, 
            name: customerCreated.name, 
            address: customerCreated.address, 
            phone: customerCreated.phone
        }
    }       
}

export { DeleteCustomerUseCase }