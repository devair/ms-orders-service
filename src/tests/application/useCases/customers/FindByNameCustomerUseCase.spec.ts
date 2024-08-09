import { CreateCustomerUseCase } from "../../../../application/useCases/customers/createCustomer/CreateCustomerUseCase"
import { FindByNameCustomerUseCase } from "../../../../application/useCases/customers/findByNameCustomer/FindByNameCustomerUseCase"
import { AppDataSource } from "../../../../infra/datasource/typeorm"


let createCustomerUseCase : CreateCustomerUseCase
let findByNameCustomerUseCase : FindByNameCustomerUseCase

describe('Customers User Case tests', ()=>{

    beforeEach(()=>{        
        createCustomerUseCase = new CreateCustomerUseCase(AppDataSource) 
        findByNameCustomerUseCase = new FindByNameCustomerUseCase(AppDataSource)                    
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