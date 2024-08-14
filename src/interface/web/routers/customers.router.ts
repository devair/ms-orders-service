import { Router } from 'express'
import { CustomersApi } from '../api/CustomersApi'

export const customersRouter = (api: CustomersApi) => {
    const router = Router()
    router.get('/search', (req, res) => api.search(req, res))
    router.get('/:id', (req, res) => api.findById(req, res))
    router.get('/', (req, res) => api.list(req, res))
    router.post('/', (req, res) => api.create(req, res))
    router.post('/delete', (req, res) => api.delete(req, res))

    return router
}