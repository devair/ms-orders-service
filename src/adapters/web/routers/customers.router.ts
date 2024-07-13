
import { Router } from 'express'
import { CustomersApi } from '../api/CustomersApi'

const customersRouter = Router()

customersRouter.get('/search',CustomersApi.search.bind(CustomersApi))
customersRouter.get('/:id', CustomersApi.findById.bind(CustomersApi))
customersRouter.get('/', CustomersApi.list.bind(CustomersApi))
customersRouter.post('/', CustomersApi.create.bind(CustomersApi))

export { customersRouter }