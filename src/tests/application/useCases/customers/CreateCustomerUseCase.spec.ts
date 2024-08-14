import { CreateCustomerUseCase } from "../../../../application/useCases/customers/CreateCustomerUseCase"
import { AppDataSource } from "../../../../infra/datasource/typeorm"

let createCustomerUseCase: CreateCustomerUseCase

describe('Customers Use Case tests',()=>{

    beforeEach(()=>{        
        createCustomerUseCase = new CreateCustomerUseCase(AppDataSource)
    })

    it('Should be able to create a new customer', async ()=>{
       
        const customer = await createCustomerUseCase.execute({ name: 'Fulano', cpf: '35712606607', 
        phone: '4799999999', email: 'fulano@silva.com.br'})

        expect(customer).toHaveProperty('id')

    })

    it('Should not be able to duplicated a customer', async ()=>{

        expect(async ()=>{            

            await createCustomerUseCase.execute({ name: 'Fulano', cpf: '35712606607', 
            phone: '4799999999', email: 'fulano@silva.com.br'})

            await createCustomerUseCase.execute({ name: 'Ciclano', cpf: '35712606607', 
            phone: '4799999999', email: 'Ciclano@silva.com.br'})


        }).rejects.toBeInstanceOf(Error)

    })

})