import { CategoriesRepositoryInMemory } from "../../../../../external/datasource/in-memory/CategoriesRepositoryInMemory"
import { CustomersRepositoryInMemory } from "../../../../../external/datasource/in-memory/CustomersRepositoryInMemory"
import { OrderItemsRepositoryInMemory } from "../../../../../external/datasource/in-memory/OrderItemsRepositoryInMemory"
import { OrdersRepositoryInMemory } from "../../../../../external/datasource/in-memory/OrdersRepositoryInMemory"
import { ProductsRepositoryInMemory } from "../../../../../external/datasource/in-memory/ProductsRepositoryInMemory"
import { Customer } from "../../../../entities/Customer"
import { CreateCategoryUseCase } from "../../../categories/createCategory/CreateCategoryUseCase"
import { FindByIdCategoryUseCase } from "../../../categories/findByIdCategory/FindByIdCategoryUseCase"
import { CreateCustomerUseCase } from "../../../customers/createCustomer/CreateCustomerUseCase"
import { FindByCpfCustomerUseCase } from "../../../customers/findByCpfCustomer/FindByCpfCustomerUseCase"
import { CreateProductUseCase } from "../../../products/createProduct/CreateProductUseCase"
import { FindByCodeProductUseCase } from "../../../products/findByCodeProduct/FindByCodeProductUseCase"
import { CreateOrderUseCase } from "../CreateOrderUseCase"

let createCategoryUseCase: CreateCategoryUseCase
let createProductUseCase: CreateProductUseCase
let createCustomerUseCase: CreateCustomerUseCase
let findByCpfCustomerUseCase: FindByCpfCustomerUseCase
let findByIdCategoryUseCase: FindByIdCategoryUseCase
let findByCodeProductUseCase: FindByCodeProductUseCase
let createOrderUseCase: CreateOrderUseCase

describe('Orders tests', () => {
    beforeAll(async () => {

        const categoriesRepository = new CategoriesRepositoryInMemory()
        const customersRepository = new CustomersRepositoryInMemory()
        const productsRepository = new ProductsRepositoryInMemory(categoriesRepository)
        const ordersRepository = new OrdersRepositoryInMemory()
        const orderItemsRepository = new OrderItemsRepositoryInMemory()
        
        findByCpfCustomerUseCase = new FindByCpfCustomerUseCase(customersRepository)
        findByIdCategoryUseCase = new FindByIdCategoryUseCase(categoriesRepository)
        findByCodeProductUseCase = new FindByCodeProductUseCase(productsRepository)
        
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
        createCustomerUseCase = new CreateCustomerUseCase(customersRepository)
        createProductUseCase = new CreateProductUseCase(productsRepository, categoriesRepository)

        createOrderUseCase = new CreateOrderUseCase(ordersRepository,orderItemsRepository, 
            customersRepository, productsRepository )
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

    it('Should be able to create a new order', async () => {
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

    })

    it('Should not be able to create a new order. Product not found', async () => {

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