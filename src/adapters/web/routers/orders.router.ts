import { Router } from "express"
import { OrdersApi } from "../api/OrdersApi"

const ordersRouter = Router()

ordersRouter.post('/', OrdersApi.create.bind(OrdersApi))

ordersRouter.get('/', OrdersApi.list.bind(OrdersApi))

ordersRouter.get('/:id', OrdersApi.findById.bind(OrdersApi))

ordersRouter.patch('/:id/status', OrdersApi.updateStatus.bind(OrdersApi))

export { ordersRouter }