import { CategoriesRepositoryPostgres } from "../../../../../infra/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { CustomersRepositoryPostgres } from "../../../../../infra/datasource/typeorm/postgres/CustomersRepositoryPostgres"
import { OrdersRepositoryPostgres } from "../../../../../infra/datasource/typeorm/postgres/OrdersRepositoryPostgres"
import { ProductsRepositoryPostgres } from "../../../../../infra/datasource/typeorm/postgres/ProductsRepositoryPostgres"
import { ICategoriesGateway } from "../../../../../communication/gateways/ICategoriesGateway"
import { ICustomersGateway } from "../../../../../communication/gateways/ICustomersGateway"
import { IOrdersGateway } from "../../../../../communication/gateways/IOrdersGateway"
import { IProductsGateway } from "../../../../../communication/gateways/IProductsGateway"
import { Order } from "../../../../../core/entities/Order"
import { CustomerEntity } from "../../../../../infra/datasource/typeorm/entities/CustomerEntity"
import { AppDataSource } from "../../../../../infra/datasource/typeorm"
import { CategoryEntity } from "../../../../../infra/datasource/typeorm/entities/CategoryEntity"
import { ProductEntity } from "../../../../../infra/datasource/typeorm/entities/ProductEntity"
import { OrderEntity } from "../../../../../infra/datasource/typeorm/entities/OrderEntity"

let ordersRepository: IOrdersGateway
let customersRepository: ICustomersGateway
let productsRepository: IProductsGateway
let categoriesRepository: ICategoriesGateway

describe('Orders tests', () => {
    beforeAll( async () => {

        customersRepository = new CustomersRepositoryPostgres(AppDataSource.getRepository(CustomerEntity))
        categoriesRepository = new CategoriesRepositoryPostgres(AppDataSource.getRepository(CategoryEntity))
        productsRepository = new ProductsRepositoryPostgres(AppDataSource.getRepository(ProductEntity))
        ordersRepository = new OrdersRepositoryPostgres(AppDataSource.getRepository(OrderEntity))

        // creating a category
        const category = await categoriesRepository.create({ name: 'Bebida' , description: 'Bebida gelada'})

        // creating a product    
        const product = {
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        }

        await productsRepository.create(product)


        // creating a customer
        const customer = { name: 'Fulano', cpf: '35712606607', phone: '4799999999', email: 'fulano@silva.com.br' }

        await customersRepository.create(customer)

    })

    it('Should be able to create a new order', async () => {
        const product = await productsRepository.findByCode('1')
        const customer = await customersRepository.findByCpf('35712606607')
        const order = Order.place(customer) 
        order.addItem({            
            product: product,
            quantity: 2,
            unitPrice: 45.0
        })   

        const orderCreated = await ordersRepository.create(order)

        expect(orderCreated.amount).toBe(90)

        const orderFound = await ordersRepository.findById(orderCreated.id)

        expect(orderFound).toHaveProperty('id')

    })

    it('Should be able to list orders', async()=>{
        
        const orders = await ordersRepository.list()
               
        expect(orders.length).toBeGreaterThanOrEqual(1)
    }) 

})