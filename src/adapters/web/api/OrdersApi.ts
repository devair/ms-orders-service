import { Request, Response } from "express";
import { CreateOrderController } from "../../../communication/controllers/orders/CreateOrderController";
import { OrdersRepositoryPostgres } from "../../datasource/typeorm/postgres/OrdersRepositoryPostgres";
import { OrderItemsRepositoryPostgres } from "../../datasource/typeorm/postgres/OrderItemsRepositoryPostgres";
import { CustomersRepositoryPostgres } from "../../datasource/typeorm/postgres/CustomersRepositoryPostgres";
import { ProductsRepositoryPostgres } from "../../datasource/typeorm/postgres/ProductsRepositoryPostgres";
import { ListOrdersController } from "../../../communication/controllers/orders/ListOrdersController";
import { FindByIdOrderController } from "../../../communication/controllers/orders/FindByIdOrderController";
import { UpdateOrderStatusController } from "../../../communication/controllers/orders/UpdateOrderStatusController";
import { OrderPresenter } from "../../../communication/presenters/OrderPresenter";

class OrdersApi {

    static async create (request: Request, response: Response ): Promise<Response>{

        const { customer, orderItems } =  request.body;                
        const ordersRepository = new OrdersRepositoryPostgres()
        const orderItemsRepository = new OrderItemsRepositoryPostgres()
        const customersRepository = new CustomersRepositoryPostgres()
        const productsRepository = new ProductsRepositoryPostgres()

        const createOrderController = new CreateOrderController(ordersRepository,orderItemsRepository, 
            customersRepository, productsRepository)
        
        try {
            const data = await createOrderController.handler({ customer, orderItems })
            response.contentType('application/json')
            return response.status(201).send(OrderPresenter.toJson(data))
        }
        catch (ex) {
            return response.status(400).json({ message: ex.message });
        }        
    }

    static async list(request: Request, response: Response): Promise<Response> {

        const ordersRepository = new OrdersRepositoryPostgres()
        const listOrdersController = new ListOrdersController(ordersRepository)
        
        try{
            const data = await listOrdersController.handler()
            response.contentType('application/json')
            return response.status(200).send(OrderPresenter.toJson(data))
        } catch (ex) {
            return response.status(400).json({ message: ex.message });
        }        
    }

    static async findById(request: Request, response: Response): Promise<Response> {

        const { id } = request.params
        const ordersRepository = new OrdersRepositoryPostgres()
        const findByIdOrderController = new FindByIdOrderController(ordersRepository)        

        try{
            const data = await findByIdOrderController.handler( parseInt(id) )
            response.contentType('application/json')
            return response.status(200).send(OrderPresenter.toJson(data))
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }        
    }

    static async updateStatus(request: Request, response: Response): Promise<Response> {

        let { id } = request.params
        let { status } = request.body

        const ordersRepository = new OrdersRepositoryPostgres()
        const updateStatusOrderController = new UpdateOrderStatusController(ordersRepository)

        try{
            const data =  await updateStatusOrderController.handler( { id: parseInt(id), status } )     
            response.contentType('application/json')
            return response.status(200).send(OrderPresenter.toJson(data))       
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }        
    }
}

export { OrdersApi }