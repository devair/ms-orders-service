import "reflect-metadata"
import { ICategoriesGateway } from "../../../../communication/gateways/ICategoriesGateway"
import { ICustomersGateway } from "../../../../communication/gateways/ICustomersGateway"
import { IOrdersGateway } from "../../../../communication/gateways/IOrdersGateway"
import { IProductsGateway } from "../../../../communication/gateways/IProductsGateway"
import { Order } from "../../../../core/entities/Order"
import { OrdersRepositoryInMemory } from "../OrdersRepositoryInMemory"
import { CustomersRepositoryPostgres } from "../../typeorm/postgres/CustomersRepositoryPostgres"
import { CategoriesRepositoryPostgres } from "../../typeorm/postgres/CategoriesRepositoryPostgres"
import { ProductsRepositoryPostgres } from "../../typeorm/postgres/ProductsRepositoryPostgres"


let ordersRepository: IOrdersGateway
let customersRepository: ICustomersGateway
let productsRepository: IProductsGateway
let categoriesRepository: ICategoriesGateway

describe('Orders tests', () => {
    beforeAll( async () => {

        customersRepository = new CustomersRepositoryPostgres()
        categoriesRepository = new CategoriesRepositoryPostgres()
        productsRepository = new ProductsRepositoryPostgres()
        ordersRepository = new OrdersRepositoryInMemory()

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