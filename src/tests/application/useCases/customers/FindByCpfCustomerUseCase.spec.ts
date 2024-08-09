import { CustomersRepositoryPostgres } from "../../../../infra/datasource/typeorm/postgres/CustomersRepositoryPostgres"
import { CreateCustomerUseCase } from "../../../../application/useCases/customers/createCustomer/CreateCustomerUseCase"
import { FindByCpfCustomerUseCase } from "../../../../application/useCases/customers/findByCpfCustomer/FindByCpfCustomerUseCase"

let createCustomerUseCase : CreateCustomerUseCase
let findByCpfCustomerUseCase : FindByCpfCustomerUseCase

describe('Customers User Case tests', ()=>{

    beforeEach(()=>{
        const customersRepository = new CustomersRepositoryPostgres()
        createCustomerUseCase = new CreateCustomerUseCase(customersRepository) 
        findByCpfCustomerUseCase = new FindByCpfCustomerUseCase(customersRepository)                    
    })

    it('Should be able to find a Customer by cpf', async()=>{
        
        const customer = await createCustomerUseCase.execute({ name: 'Fulano', cpf: '35712606607', 
        phone: '4799999999', email: 'fulano@silva.com.br'})

        const customerCreated = await findByCpfCustomerUseCase.execute(customer.cpf)

        expect(customerCreated).toHaveProperty('id')
    })

    it('Should not be able to find a Customer by cpf', async ()=>{

        expect(async ()=>{               
            await findByCpfCustomerUseCase.execute('12345678912')         
        }).rejects.toBeInstanceOf(Error)

    })

})