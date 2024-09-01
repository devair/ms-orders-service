import { CustomerDelete } from "../../core/entities/CustomerDelete"

interface ICustomersDeleteGateway {

    create(customerDelele: CustomerDelete ): Promise<CustomerDelete>

    list(): Promise<CustomerDelete[]>

    findByName(name: string): Promise<CustomerDelete[]>
}

export { ICustomersDeleteGateway }