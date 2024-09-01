import { Router } from "express"
import { OrdersApi } from "../api/OrdersApi"


export const ordersRouter = (api: OrdersApi) => {
    const router = Router()

    router.post('/', (req, res) => api.create(req, res))
    router.get('/', (req, res) => api.list(req, res))
    router.get('/:id', (req, res) => api.findById(req, res))
    router.patch('/:id/status', (req, res) => api.updateStatus(req, res))

    return router
}