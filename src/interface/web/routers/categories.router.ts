import { Router } from 'express'
import { CategoriesApi } from '../api/CategoriesApi'

export const categoriesRouter = (api: CategoriesApi)=> {
    const router = Router()
    router.post('/', (req,res)=>api.create(req,res))
    router.put('/:id', (req,res)=>api.update(req,res))
    router.get('/search', (req,res)=>api.search(req,res))
    router.get('/:id', (req,res)=>api.findById(req,res))
    router.get('/', (req,res)=>api.list(req,res))
    return router
}