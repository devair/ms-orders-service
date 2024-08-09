import { Request, Response } from "express"
import { CategoriesRepositoryPostgres } from "../../datasource/typeorm/postgres/CategoriesRepositoryPostgres";
import { FindByIdCategoryController } from "../../../communication/controllers/categories/FindByIdCategoryController";
import { ListCategoriesController } from "../../../communication/controllers/categories/ListCategoriesController";
import { CreateCategoryController } from "../../../communication/controllers/categories/CreateCategoryController";
import { EditCategoryController } from "../../../communication/controllers/categories/EditCategoryController";
import { FindByNameCategoryController } from "../../../communication/controllers/categories/FindByNameCategoryController";
import { CategoryPresenter } from "../../../communication/presenters/CategoryPresenter";

class CategoriesApi {

    static async list(request: Request, response: Response): Promise<Response> {

        const categoriesRepository = new CategoriesRepositoryPostgres()
        const listCategoriesController = new ListCategoriesController(categoriesRepository)
        
        try{
            const data  = await listCategoriesController.handler()    
            response.contentType('application/json')
            return response.status(200).send(CategoryPresenter.toJson(data))
        } catch (ex) {
            return response.status(400).json({ message: ex.message });
        }
    }

    static async create(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;        
        const categoriesRepository = new CategoriesRepositoryPostgres()
        const createCategoryController = new CreateCategoryController(categoriesRepository)
       
        try {
            const data = await createCategoryController.handler({ name, description });
            response.contentType('application/json')
            return response.status(201).send(CategoryPresenter.toJson(data))
        }
        catch (ex) {
            return response.status(400).json({ message: ex.message })
        }        
    }

    static async findById(request: Request, response: Response): Promise<Response>{
        
        const { id } = request.params

        const categoriesRepository = new CategoriesRepositoryPostgres()
        const findByIdCategoryController = new FindByIdCategoryController(categoriesRepository)

        try{
            const data = await findByIdCategoryController.handler( parseInt(id) )  
            response.contentType('application/json')
            return response.status(200).send(CategoryPresenter.toJson(data))
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }        
    }

    static async update(request: Request, response: Response): Promise<Response>{
        const { id } = request.params
        const { name, description } = request.body

        const categoriesRepository = new CategoriesRepositoryPostgres()
        const editCategoryController = new EditCategoryController(categoriesRepository)
         
        const object = { 
            id: parseInt(id),
            name,
            description
        }

        try{
            await editCategoryController.handler(object)            
            return response.status(204).send()
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }        
    }

    static async search (request: Request, response: Response): Promise<Response>{
        
        const { name }  = request.query
        
        const categoriesRepository = new CategoriesRepositoryPostgres()
        const findByNameCategoryController = new FindByNameCategoryController(categoriesRepository)
        
        try{                
            const data = await findByNameCategoryController.handler( name.toString())
            response.contentType('application/json')
            return response.status(200).send(CategoryPresenter.toJson(data))            
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }        
    }
}

export { CategoriesApi }
