import { CategoriesRepositoryPostgres } from "../../../../adapters/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { CustomersRepositoryPostgres } from "../../../../adapters/datasource/typeorm/postgres/CustomersRepositoryPostgres"
import { OrderItemsRepositoryPostgres } from "../../../../adapters/datasource/typeorm/postgres/OrderItemsRepositoryPostgres"
import { OrdersRepositoryPostgres } from "../../../../adapters/datasource/typeorm/postgres/OrdersRepositoryPostgres"
import { ProductsRepositoryPostgres } from "../../../../adapters/datasource/typeorm/postgres/ProductsRepositoryPostgres"
import { Customer } from "../../../../core/entities/Customer"
import { CreateCategoryUseCase } from "../../../../core/useCases/categories/createCategory/CreateCategoryUseCase"
import { CreateCustomerUseCase } from "../../../../core/useCases/customers/createCustomer/CreateCustomerUseCase"
import { FindByCpfCustomerUseCase } from "../../../../core/useCases/customers/findByCpfCustomer/FindByCpfCustomerUseCase"
import { CreateOrderUseCase } from "../../../../core/useCases/orders/createOrderUseCase/CreateOrderUseCase"
import { UpdateOrderStatusUseCase } from "../../../../core/useCases/orders/updateStatus/UpdateOrderStatusUseCase"
import { CreateProductUseCase } from "../../../../core/useCases/products/createProduct/CreateProductUseCase"
import { FindByCodeProductUseCase } from "../../../../core/useCases/products/findByCodeProduct/FindByCodeProductUseCase"

let createCategoryUseCase: CreateCategoryUseCase
let createProductUseCase: CreateProductUseCase
let createCustomerUseCase: CreateCustomerUseCase
let findByCpfCustomerUseCase: FindByCpfCustomerUseCase
let findByCodeProductUseCase: FindByCodeProductUseCase
let createOrderUseCase: CreateOrderUseCase
let updateOrderStatusUseCase: UpdateOrderStatusUseCase

describe('Orders tests', () => {
    beforeAll(async () => {

        const categoriesRepository = new CategoriesRepositoryPostgres()
        const customersRepository = new CustomersRepositoryPostgres()
        const productsRepository = new ProductsRepositoryPostgres()
        const ordersRepository = new OrdersRepositoryPostgres()
        const orderItemsRepository = new OrderItemsRepositoryPostgres()
        
        findByCpfCustomerUseCase = new FindByCpfCustomerUseCase(customersRepository)        
        findByCodeProductUseCase = new FindByCodeProductUseCase(productsRepository)
        
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
        createCustomerUseCase = new CreateCustomerUseCase(customersRepository)
        createProductUseCase = new CreateProductUseCase(productsRepository, categoriesRepository)

        createOrderUseCase = new CreateOrderUseCase(ordersRepository,orderItemsRepository, 
            customersRepository, productsRepository )
         
        updateOrderStatusUseCase = new UpdateOrderStatusUseCase(ordersRepository)


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