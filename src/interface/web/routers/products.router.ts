import { Router } from 'express'
import { ProductsApi } from '../api/ProductsApi'


export const productsRouter = (api: ProductsApi) => {

    const router = Router()

    router.get('/search', (req,res) => api.search(req,res))
    router.get('/:id', (req,res) => api.findById(req,res))
    router.delete('/:id', (req,res) => api.delete(req,res))
    router.get('/', (req,res) => api.list(req,res))
    router.post('/', (req,res) => api.create(req,res))
    router.put('/:id', (req,res) => api.update(req,res))

    return router
}