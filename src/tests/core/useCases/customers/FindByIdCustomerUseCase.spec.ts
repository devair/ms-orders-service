import { CustomersRepositoryPostgres } from "../../../../adapters/datasource/typeorm/postgres/CustomersRepositoryPostgres"
import { CreateCustomerUseCase } from "../../../../core/useCases/customers/createCustomer/CreateCustomerUseCase"
import { FindByIdCustomerUseCase } from "../../../../core/useCases/customers/findByIdCustomer/FindByIdCustomerUseCase"


let createCustomerUseCase : CreateCustomerUseCase
let findByIdCustomerUseCase : FindByIdCustomerUseCase

describe('Customers User Case tests', ()=>{

    beforeEach(()=>{
        const customersRepository = new CustomersRepositoryPostgres()
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