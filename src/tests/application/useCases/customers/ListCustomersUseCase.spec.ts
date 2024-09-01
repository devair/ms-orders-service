import { CreateCustomerUseCase } from "../../../../application/useCases/customers/CreateCustomerUseCase"
import { ListCustomersUseCase } from "../../../../application/useCases/customers/ListCustomersUseCase"
import { AppDataSource } from "../../../../infra/datasource/typeorm"

let listCustomersUseCase : ListCustomersUseCase
let createCustomerUseCase : CreateCustomerUseCase

describe('Customers Use Case tests', ()=>{

    beforeEach(()=>{        
        createCustomerUseCase = new CreateCustomerUseCase(AppDataSource)
        listCustomersUseCase = new ListCustomersUseCase(AppDataSource)

    })

    it('Should be able to list customers', async ()=>{
        const customer = await createCustomerUseCase.execute({ name: 'Fulano', cpf: '35712606607', 
        phone: '4799999999', email: 'fulano@silva.com.br'})

        expect(customer).toHaveProperty('id')

        const customers = await listCustomersUseCase.execute()
        
        expect(customers).toHaveLength(1)
    })

})