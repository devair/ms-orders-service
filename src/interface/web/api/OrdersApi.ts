import { Request, Response } from "express"
import { DataSource } from "typeorm"
import { CreateOrderUseCase } from "../../../application/useCases/orders/CreateOrderUseCase"
import { FindByIdOrderUseCase } from "../../../application/useCases/orders/FindByIdOrderUseCase"
import { ListOrdersUseCase } from "../../../application/useCases/orders/ListOrdersUseCase"
import { UpdateOrderStatusUseCase } from "../../../application/useCases/orders/UpdateOrderStatusUseCase"
import { CreateOrderController } from "../../../communication/controllers/orders/CreateOrderController"
import { FindByIdOrderController } from "../../../communication/controllers/orders/FindByIdOrderController"
import { ListOrdersController } from "../../../communication/controllers/orders/ListOrdersController"
import { UpdateOrderStatusController } from "../../../communication/controllers/orders/UpdateOrderStatusController"
import { OrderPresenter } from "../../../communication/presenters/OrderPresenter"
import { IOrderQueueAdapterOUT } from "../../../core/messaging/IOrderQueueAdapterOUT"
class OrdersApi {
    constructor(
        private readonly dataSource: DataSource,
        private publisher: IOrderQueueAdapterOUT
    ) { }

    async create(request: Request, response: Response): Promise<Response> {
        const { customer, orderItems } = request.body        
        const createOrderUseCase = new CreateOrderUseCase(this.dataSource, this.publisher)
        const createOrderController = new CreateOrderController(createOrderUseCase)

        try {
            const data = await createOrderController.handler({ customer, orderItems })
            response.contentType('application/json')
            return response.status(201).send(OrderPresenter.toJson(data))
        }
        catch (ex) {
            return response.status(400).json({ message: ex.message })
        }
    }

    async list(request: Request, response: Response): Promise<Response> {

        const listOrdersUseCase = new ListOrdersUseCase(this.dataSource)
        const listOrdersController = new ListOrdersController(listOrdersUseCase)

        try {
            const data = await listOrdersController.handler()
            response.contentType('application/json')
            return response.status(200).send(OrderPresenter.toJson(data))
        } catch (ex) {
            return response.status(400).json({ message: ex.message })
        }
    }

    async findById(request: Request, response: Response): Promise<Response> {

        const { id } = request.params
        const findByIdOrderUse = new FindByIdOrderUseCase(this.dataSource)
        const findByIdOrderController = new FindByIdOrderController(findByIdOrderUse)

        try {
            const data = await findByIdOrderController.handler(parseInt(id))
            response.contentType('application/json')
            return response.status(200).send(OrderPresenter.toJson(data))
        }
        catch (ex) {
            return response.status(400).json({ message: ex.message })
        }
    }

    async updateStatus(request: Request, response: Response): Promise<Response> {

        let { id } = request.params
        let { status } = request.body
        
        const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(this.dataSource, this.publisher)       
        const updateStatusOrderController = new UpdateOrderStatusController(updateOrderStatusUseCase)

        try {
            const data = await updateStatusOrderController.handler({ id: parseInt(id), status })
            response.contentType('application/json')
            return response.status(200).send(OrderPresenter.toJson(data))
        }
        catch (ex) {
            return response.status(400).json({ message: ex.message })
        }
    }
}

export { OrdersApi }