import { Router } from 'express'
import { ProductsApi } from '../api/ProductsApi'


const productsRouter = Router()

productsRouter.get('/search',ProductsApi.search.bind(ProductsApi))
productsRouter.get('/:id', ProductsApi.findById.bind(ProductsApi))
productsRouter.delete('/:id', ProductsApi.delete.bind(ProductsApi))
productsRouter.get('/', ProductsApi.list.bind(ProductsApi))
productsRouter.post('/', ProductsApi.create.bind(ProductsApi))
productsRouter.put('/:id', ProductsApi.update.bind(ProductsApi))

export { productsRouter }