import { ICustomersGateway } from "../../../communication/gateways/ICustomersGateway"
import { Customer } from "../../../core/entities/Customer"
import { InputCreateCustomerDTO } from "../../../core/useCases/customers/createCustomer/ICreateCustomerDTO"
import { genId } from "./Util"

class CustomersRepositoryInMemory implements ICustomersGateway{

    private customers: Customer[]

    constructor(){
        this.customers = []
    }

    async create({ name, email, cpf, phone }: InputCreateCustomerDTO ): Promise<Customer>  {
        const customer = new Customer()

        const id = genId(this.customers)

        Object.assign(customer, { id, name, email, cpf, phone } )
        this.customers.push(customer)

        return customer
    }

    async list(): Promise<Customer[]> {
        return this.customers
    }
    
    async findByCpf(cpf: string): Promise<Customer> {
        const customer = this.customers.find((customer)=> customer.cpf === cpf)
        
        return customer
    }

    async findById(id: number): Promise<Customer> {
        const customer = this.customers.find((customer)=> customer.id === id)
        
        return customer

    }

    async findByName(name: string): Promise<Customer[]> {
        let customersFounded : Customer[] = []

        this.customers.forEach((customer) => {
            if(customer.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())){
                customersFounded.push(customer)
            }
        })            

        return customersFounded
    }
}

export { CustomersRepositoryInMemory }