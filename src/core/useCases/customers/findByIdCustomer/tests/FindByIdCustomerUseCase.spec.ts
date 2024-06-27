import { CustomersRepositoryInMemory } from "../../../../../external/datasource/in-memory/CustomersRepositoryInMemory"
import { CreateCustomerUseCase } from "../../createCustomer/CreateCustomerUseCase"
import { FindByIdCustomerUseCase } from "../FindByIdCustomerUseCase"

let createCustomerUseCase : CreateCustomerUseCase
let findByIdCustomerUseCase : FindByIdCustomerUseCase

describe('Customers User Case tests', ()=>{

    beforeEach(()=>{
        const customersRepository = new CustomersRepositoryInMemory()
        createCustomerUseCase = new CreateCustomerUseCase(customersRepository) 
        findByIdCustomerUseCase = new FindByIdCustomerUseCase(customersRepository)                    
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