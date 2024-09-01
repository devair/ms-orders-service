import { Repository } from "typeorm";
import { Customer } from "../../../../core/entities/Customer";
import { CustomerDelete } from "../../../../core/entities/CustomerDelete"
import { ICustomersDeleteGateway } from "../../../../communication/gateways/ICustomersDeleteGateway"

class CustomerDeleteRepositoryPostgres implements ICustomersDeleteGateway {

    constructor(
        private readonly repository: Repository<CustomerDelete>
    ){}

    async create(customerDelete: CustomerDelete): Promise<CustomerDelete> {

        const customer = this.repository.create(customerDelete);

        const customerCreated = await this.repository.save(customer)

        return customerCreated
    }

    async list(): Promise<CustomerDelete[]> {
        const all = await this.repository.find()

        return all
    }

    async findByName(name: string): Promise<CustomerDelete[]> {
        const customers = await this.repository
        .createQueryBuilder('customer_delete')
        .where('LOWER(name) LIKE :pattern', { pattern: `%${ name.toLowerCase() }%` })                                    
        .getMany()

        return customers
    }
}

export { CustomerDeleteRepositoryPostgres }