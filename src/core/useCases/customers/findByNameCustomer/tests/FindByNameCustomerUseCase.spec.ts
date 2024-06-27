import { CustomersRepositoryInMemory } from "../../../../../external/datasource/in-memory/CustomersRepositoryInMemory"
import { CreateCustomerUseCase } from "../../createCustomer/CreateCustomerUseCase"
import { FindByNameCustomerUseCase } from "../FindByNameCustomerUseCase"

let createCustomerUseCase : CreateCustomerUseCase
let findByNameCustomerUseCase : FindByNameCustomerUseCase

describe('Customers User Case tests', ()=>{

    beforeEach(()=>{
        const customersRepository = new CustomersRepositoryInMemory()
        createCustomerUseCase = new CreateCustomerUseCase(customersRepository) 
        findByNameCustomerUseCase = new FindByNameCustomerUseCase(customersRepository)                    
    })

    it('Should be able to find a customer by name', async ()=>{
        
        const customer = await createCustomerUseCase.execute({ name: 'Fulano', cpf: '35712606607', 
        phone: '4799999999', email: 'fulano@silva.com.br'})

        const customers = await findByNameCustomerUseCase.execute(customer.name)

        expect(customers.length).toBeGreaterThanOrEqual(1)

    })

    it('Should not be able to find a customer by name', async ()=>{

        const customers = await findByNameCustomerUseCase.execute('PPP')

        expect(customers.length).toBe(0)
    })

})