import { CustomersRepositoryPostgres } from "../../../../../infra/datasource/typeorm/postgres/CustomersRepositoryPostgres"
import { ICustomersGateway } from "../../../../../communication/gateways/ICustomersGateway"
import { AppDataSource } from "../../../../../infra/datasource/typeorm"
import { CustomerEntity } from "../../../../../infra/datasource/typeorm/entities/CustomerEntity"

let customersRepository: ICustomersGateway

describe('Customers tests',()=>{

    beforeAll(()=>{
        customersRepository = new CustomersRepositoryPostgres(AppDataSource.getRepository(CustomerEntity))
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
})