import { CreateCustomerUseCase } from "../../../../application/useCases/customers/CreateCustomerUseCase"
import { FindByIdCustomerUseCase } from "../../../../application/useCases/customers/FindByIdCustomerUseCase"
import { AppDataSource } from "../../../../infra/datasource/typeorm"


let createCustomerUseCase : CreateCustomerUseCase
let findByIdCustomerUseCase : FindByIdCustomerUseCase

describe('Customers User Case tests', ()=>{

    beforeEach(()=>{        
        createCustomerUseCase = new CreateCustomerUseCase(AppDataSource) 
        findByIdCustomerUseCase = new FindByIdCustomerUseCase(AppDataSource)                    
    })

    it('Should be able to find a Customer by id', async()=>{
        
        const customer = await createCustomerUseCase.execute({ name: 'Fulano', cpf: '35712606607', 
        phone: '4799999999', email: 'fulano@silva.com.br'})

        const customerCreated = await findByIdCustomerUseCase.execute(customer.id)

        expect(customerCreated).toHaveProperty('id')
    })

    it('Should not be able to find a Customer by id', async ()=>{

        expect(async ()=>{               
            await findByIdCustomerUseCase.execute(99)         
        }).rejects.toBeInstanceOf(Error)

    })

})