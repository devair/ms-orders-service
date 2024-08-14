import RabbitMQOrderQueueAdapterOUT from "../../../../infra/messaging/RabbitMQOrderQueueAdapterOUT"
import { IOrderQueueAdapterOUT } from "../../../../core/messaging/IOrderQueueAdapterOUT"
import { CreateCategoryUseCase } from "../../../../application/useCases/categories/CreateCategoryUseCase"
import { CreateCustomerUseCase } from "../../../../application/useCases/customers/CreateCustomerUseCase"
import { FindByCpfCustomerUseCase } from "../../../../application/useCases/customers/FindByCpfCustomerUseCase"
import { CreateOrderUseCase } from "../../../../application/useCases/orders/CreateOrderUseCase"
import { ListOrdersUseCase } from "../../../../application/useCases/orders/ListOrdersUseCase"
import { CreateProductUseCase } from "../../../../application/useCases/products/CreateProductUseCase"
import { FindByCodeProductUseCase } from "../../../../application/useCases/products/FindByCodeProductUseCase"
import { AppDataSource } from "../../../../infra/datasource/typeorm"

let createCategoryUseCase: CreateCategoryUseCase
let createProductUseCase: CreateProductUseCase
let createCustomerUseCase: CreateCustomerUseCase
let findByCpfCustomerUseCase: FindByCpfCustomerUseCase
let findByCodeProductUseCase: FindByCodeProductUseCase
let createOrderUseCase: CreateOrderUseCase
let listOrdersUseCase: ListOrdersUseCase
let orderCreatedPublisher : IOrderQueueAdapterOUT;

describe('Orders tests', () => {
    beforeAll(async () => {
        
        orderCreatedPublisher = new RabbitMQOrderQueueAdapterOUT() 
        findByCpfCustomerUseCase = new FindByCpfCustomerUseCase(AppDataSource)        
        findByCodeProductUseCase = new FindByCodeProductUseCase(AppDataSource)
        
        createCategoryUseCase = new CreateCategoryUseCase(AppDataSource)
        createCustomerUseCase = new CreateCustomerUseCase(AppDataSource)
        createProductUseCase = new CreateProductUseCase(AppDataSource)

        createOrderUseCase = new CreateOrderUseCase(AppDataSource,orderCreatedPublisher )

        listOrdersUseCase = new ListOrdersUseCase(AppDataSource)

        // creating a category
        const category = { name: 'Bebida', description: 'Bebida gelada' }
        const categoryCreated = await createCategoryUseCase.execute(category)

        // creating a product    
        await createProductUseCase.execute({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: categoryCreated.id, image: ''
        })

        // creating a customer
        const customer = { name: 'Fulano', cpf: '35712606607', phone: '4799999999', email: 'fulano@silva.com.br' }
        await createCustomerUseCase.execute(customer)

    })
    
    it('Should be able to list orders', async () => {
        const product = await findByCodeProductUseCase.execute('1')
        const customer = await findByCpfCustomerUseCase.execute('35712606607')
        const orderItems = []

        orderItems.push({
            product: product,
            quantity: 2,
            unitPrice: 45.0
        })

        const orderCreated = await createOrderUseCase.execute({ customer, orderItems })

        expect(orderCreated.amount).toBe(90)
        expect(orderCreated).toHaveProperty('id')
        
        const orders = await listOrdersUseCase.execute()

        expect(orders.length).toBeGreaterThanOrEqual(1)
    })
})