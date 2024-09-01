import { CustomersRepositoryPostgres } from "../../../../../infra/datasource/typeorm/postgres/CustomersRepositoryPostgres"
import { ICustomersGateway } from "../../../../../communication/gateways/ICustomersGateway"
import { AppDataSource } from "../../../../../infra/datasource/typeorm"
import { CustomerEntity } from "../../../../../infra/datasource/typeorm/entities/CustomerEntity"
import { ICustomersDeleteGateway } from "../../../../../communication/gateways/ICustomersDeleteGateway"
import { CustomerDeleteEntity } from "../../../../../infra/datasource/typeorm/entities/CustomerDeleteEntity"
import { CustomerDeleteRepositoryPostgres } from "../../../../../infra/datasource/typeorm/postgres/CustomerDeleteRepositoryPostgres"
import { CustomerDelete } from "../../../../../core/entities/CustomerDelete"

let customersRepository: ICustomersGateway
let customersDeleteGateway: ICustomersDeleteGateway

describe('Customers tests',()=>{

    beforeAll(()=>{
        customersRepository = new CustomersRepositoryPostgres(AppDataSource.getRepository(CustomerEntity))
        customersDeleteGateway = new CustomerDeleteRepositoryPostgres(AppDataSource.getRepository(CustomerDeleteEntity))
    })

    it('Should be able to create a new customer', async ()=>{
        const customer = { name: 'Fulano', cpf: '35712606607', phone: '4799999999', email: 'fulano@silva.com.br'}

        await customersRepository.create(customer)

        const customerCreated = await customersRepository.findByCpf(customer.cpf)

        expect(customerCreated).toHaveProperty('id')

    })

    it('Should be able to list customers', async ()=>{
        
        const customers = await customersRepository.list()
        
        expect(customers).toHaveLength(1)
    }) 

    it('Should be able to create a new customer', async ()=>{
        const customer = new CustomerDelete('Fulano', 'Endereco', '4799999999')

        const customerCreated = await customersDeleteGateway.create(customer)

        expect(customerCreated).toHaveProperty('id')

    })
})