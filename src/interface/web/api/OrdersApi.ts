import { Request, Response } from "express"
import { CreateOrderController } from "../../../communication/controllers/orders/CreateOrderController"
import { ListOrdersController } from "../../../communication/controllers/orders/ListOrdersController"
import { FindByIdOrderController } from "../../../communication/controllers/orders/FindByIdOrderController"
import { UpdateOrderStatusController } from "../../../communication/controllers/orders/UpdateOrderStatusController"
import { OrderPresenter } from "../../../communication/presenters/OrderPresenter"
import RabbitMQOrderQueueAdapterOUT from "../../../infra/messaging/RabbitMQOrderQueueAdapterOUT"
import { CreateOrderUseCase } from "../../../application/useCases/orders/createOrderUseCase/CreateOrderUseCase"
import { DataSource } from "typeorm"
import { ListOrdersUseCase } from "../../../application/useCases/orders/listOrders/ListOrdersUseCase"
import { FindByIdOrderUseCase } from "../../../application/useCases/orders/findByIdOrder/FindByIdOrderUseCase"
import { UpdateOrderStatusUseCase } from "../../../application/useCases/orders/updateStatus/UpdateOrderStatusUseCase"
class OrdersApi {
    constructor(
        private readonly dataSource: DataSource
    ) { }

    async create(request: Request, response: Response): Promise<Response> {
        const { customer, orderItems } = request.body
        const orderPublisher = new RabbitMQOrderQueueAdapterOUT()
        const createOrderUseCase = new CreateOrderUseCase(this.dataSource, orderPublisher)
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

        const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(this.dataSource)       
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