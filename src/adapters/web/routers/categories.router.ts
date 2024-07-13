import { Router } from 'express'
import { CategoriesApi } from '../api/CategoriesApi'

const categoriesRouter = Router()

categoriesRouter.post('/', CategoriesApi.create.bind(CategoriesApi))
categoriesRouter.put('/:id', CategoriesApi.update.bind(CategoriesApi))
categoriesRouter.get('/search', CategoriesApi.search.bind(CategoriesApi))
categoriesRouter.get('/:id', CategoriesApi.findById.bind(CategoriesApi))
categoriesRouter.get('/', CategoriesApi.list.bind(CategoriesApi))

export { categoriesRouter }