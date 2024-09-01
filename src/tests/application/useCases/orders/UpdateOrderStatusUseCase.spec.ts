import { Customer } from "../../../../core/entities/Customer"
import { IOrderQueueAdapterOUT } from "../../../../core/messaging/IOrderQueueAdapterOUT"
import { CreateCategoryUseCase } from "../../../../application/useCases/categories/CreateCategoryUseCase"
import { CreateCustomerUseCase } from "../../../../application/useCases/customers/CreateCustomerUseCase"
import { FindByCpfCustomerUseCase } from "../../../../application/useCases/customers/FindByCpfCustomerUseCase"
import { CreateOrderUseCase } from "../../../../application/useCases/orders/CreateOrderUseCase"
import { UpdateOrderStatusUseCase } from "../../../../application/useCases/orders/UpdateOrderStatusUseCase"
import { CreateProductUseCase } from "../../../../application/useCases/products/CreateProductUseCase"
import { FindByCodeProductUseCase } from "../../../../application/useCases/products/FindByCodeProductUseCase"
import { AppDataSource } from "../../../../infra/datasource/typeorm"
import { QueueNames } from "../../../../core/messaging/QueueNames"
import OrderQueueAdapterOUTMock from "../../../infra/messaging/mocks/OrderQueueAdapterOUTMock"

let createCategoryUseCase: CreateCategoryUseCase
let createProductUseCase: CreateProductUseCase
let createCustomerUseCase: CreateCustomerUseCase
let findByCpfCustomerUseCase: FindByCpfCustomerUseCase
let findByCodeProductUseCase: FindByCodeProductUseCase
let createOrderUseCase: CreateOrderUseCase
let updateOrderStatusUseCase: UpdateOrderStatusUseCase
let orderCreatedPublisher : IOrderQueueAdapterOUT;

describe('Orders tests', () => {
    beforeAll(async () => {
        
        const instance = new OrderQueueAdapterOUTMock('param1', 'param2');

        // Configura os publicadores
        const queuesOut: string[] = [QueueNames.ORDER_CREATED, QueueNames.ORDER_TO_PRODUCE,
            QueueNames.ORDER_DONE, QueueNames.ORDER_FINISHED,
            QueueNames.PAYMENT_REJECTED, QueueNames.CUSTOMER_NOTIFICATION]

        orderCreatedPublisher = instance //new RabbitMQOrderQueueAdapterOUT(connection, queuesOut)        
        findByCpfCustomerUseCase = new FindByCpfCustomerUseCase(AppDataSource)        
        findByCodeProductUseCase = new FindByCodeProductUseCase(AppDataSource)        
        createCategoryUseCase = new CreateCategoryUseCase(AppDataSource)
        createCustomerUseCase = new CreateCustomerUseCase(AppDataSource)
        createProductUseCase = new CreateProductUseCase(AppDataSource)
        createOrderUseCase = new CreateOrderUseCase(AppDataSource,orderCreatedPublisher )         
        updateOrderStatusUseCase = new UpdateOrderStatusUseCase(AppDataSource,orderCreatedPublisher)


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

    it('Should be able to a update status order', async () => {
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
        
        const orderUpdated = await updateOrderStatusUseCase.execute({id: orderCreated.id , status: 'Pronto'})

        expect(orderUpdated.status).toBe('Pronto')

    })

    it('Should not be able to update status order. Order not found', async () => {

        expect(async () => {
            const customer = new Customer()
            customer.cpf = '35712606607'

            const orderItems = []

            orderItems.push({
                product: { code: '21' },
                quantity: 2,
                unitPrice: 45.0
            })
        
            await createOrderUseCase.execute({ customer, orderItems })
        }).rejects.toBeInstanceOf(Error)

    })
})