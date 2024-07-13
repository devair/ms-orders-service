import { CategoriesRepositoryPostgres } from "../../../../../external/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { CustomersRepositoryPostgres } from "../../../../../external/datasource/typeorm/postgres/CustomersRepositoryPostgres"
import { OrderItemsRepositoryPostgres } from "../../../../../external/datasource/typeorm/postgres/OrderItemsRepositoryPostgres"
import { OrdersRepositoryPostgres } from "../../../../../external/datasource/typeorm/postgres/OrdersRepositoryPostgres"
import { ProductsRepositoryPostgres } from "../../../../../external/datasource/typeorm/postgres/ProductsRepositoryPostgres"
import { CreateCategoryUseCase } from "../../../categories/createCategory/CreateCategoryUseCase"
import { FindByIdCategoryUseCase } from "../../../categories/findByIdCategory/FindByIdCategoryUseCase"
import { CreateCustomerUseCase } from "../../../customers/createCustomer/CreateCustomerUseCase"
import { FindByCpfCustomerUseCase } from "../../../customers/findByCpfCustomer/FindByCpfCustomerUseCase"
import { CreateProductUseCase } from "../../../products/createProduct/CreateProductUseCase"
import { FindByCodeProductUseCase } from "../../../products/findByCodeProduct/FindByCodeProductUseCase"
import { CreateOrderUseCase } from "../../createOrderUseCase/CreateOrderUseCase"
import { ListOrdersUseCase } from "../ListOrdersUseCase"

let createCategoryUseCase: CreateCategoryUseCase
let createProductUseCase: CreateProductUseCase
let createCustomerUseCase: CreateCustomerUseCase
let findByCpfCustomerUseCase: FindByCpfCustomerUseCase
let findByIdCategoryUseCase: FindByIdCategoryUseCase
let findByCodeProductUseCase: FindByCodeProductUseCase
let createOrderUseCase: CreateOrderUseCase
let listOrdersUseCase: ListOrdersUseCase

describe('Orders tests', () => {
    beforeAll(async () => {

        const categoriesRepository = new CategoriesRepositoryPostgres()
        const customersRepository = new CustomersRepositoryPostgres()
        const productsRepository = new ProductsRepositoryPostgres()
        const ordersRepository = new OrdersRepositoryPostgres()
        const orderItemsRepository = new OrderItemsRepositoryPostgres()
        
        findByCpfCustomerUseCase = new FindByCpfCustomerUseCase(customersRepository)
        findByIdCategoryUseCase = new FindByIdCategoryUseCase(categoriesRepository)
        findByCodeProductUseCase = new FindByCodeProductUseCase(productsRepository)
        
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
        createCustomerUseCase = new CreateCustomerUseCase(customersRepository)
        createProductUseCase = new CreateProductUseCase(productsRepository, categoriesRepository)

        createOrderUseCase = new CreateOrderUseCase(ordersRepository,orderItemsRepository, 
            customersRepository,productsRepository )

        listOrdersUseCase = new ListOrdersUseCase(ordersRepository)

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