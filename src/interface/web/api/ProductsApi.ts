import { Request, Response } from "express";
import { ProductsRepositoryPostgres } from "../../../infra/datasource/typeorm/postgres/ProductsRepositoryPostgres";
import { CategoriesRepositoryPostgres } from "../../../infra/datasource/typeorm/postgres/CategoriesRepositoryPostgres";
import { CreateProductController } from "../../../communication/controllers/products/CreateProductController";
import { ListProductsController } from "../../../communication/controllers/products/ListProductsController";
import { FindByIdProductController } from "../../../communication/controllers/products/FindByIdProductController";
import { SearchProductsController } from "../../../communication/controllers/products/SearchProductsController";
import { DeleteProductController } from "../../../communication/controllers/products/DeleteProductController";
import { EditProductController } from "../../../communication/controllers/products/EditProductController";
import { ProductPresenter } from "../../../communication/presenters/ProductPresenter";


class ProductsApi {

    static async create(request: Request, response: Response): Promise<Response> {

        const { code, name, description, categoryId, price, image } = request.body;

        const productsRepository = new ProductsRepositoryPostgres()
        const categoriesRepository = new CategoriesRepositoryPostgres()    
        const createProductController = new CreateProductController(productsRepository,categoriesRepository)

        try {
            const data = await createProductController.handler({ code, name, description, 
                categoryId, price, image });
            response.contentType('application/json')
            return response.status(201).send(ProductPresenter.toJson(data))
        }
        catch (ex) {
            return response.status(400).json({ message: ex.message });
        }        
    }

    static async list(request: Request, response: Response): Promise<Response> {

        const productsRepository = new ProductsRepositoryPostgres()
        const listProductsController = new ListProductsController(productsRepository)

        try{
            const data = await listProductsController.handler()
            response.contentType('application/json')
            return response.status(200).send(ProductPresenter.toJson(data))

        } catch (ex) {
            return response.status(400).json({ message: ex.message });
        }        
    }

    static async findById(request: Request, response: Response): Promise<Response>{
        
        const { id } = request.params

        const productsRepository = new ProductsRepositoryPostgres()
        const findByIdProductController = new FindByIdProductController(productsRepository)        

        try{
            const data = await findByIdProductController.handler( parseInt(id) )
            response.contentType('application/json')            
            return response.status(200).send(ProductPresenter.toJson(data))
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }        
    }
    
    static async search (request: Request, response: Response): Promise<Response>{
        
        const { name, categoryName, code }  = request.query as { [key: string]: string}
        
        const productsRepository = new ProductsRepositoryPostgres()
        const searchProductsController = new SearchProductsController(productsRepository)

        try{            
            const data = await searchProductsController.handler( name, categoryName, code)            
            response.contentType('application/json')
            return response.status(200).send(ProductPresenter.toJson(data))
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }        
    }

    static async delete(request: Request, response: Response): Promise<Response>{
        const { id } = request.params
        
        const productsRepository = new ProductsRepositoryPostgres()
        const deleteProductController = new DeleteProductController(productsRepository)
        
        try{
            await deleteProductController.handler( parseInt(id) )
            return response.status(204).send()
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
    }

    static async update(request: Request, response: Response): Promise<Response>{
        
        const { id } = request.params

        const productsRepository = new ProductsRepositoryPostgres()
        const categoriesRepository = new CategoriesRepositoryPostgres()
        const editCategoryController = new EditProductController(productsRepository, categoriesRepository)

        const { code, name, description, categoryId, price, image } = request.body

        try{
            await editCategoryController.handler({ id: parseInt(id), code, name, description, categoryId, price, image })
            return response.status(204).send()
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
    }    
}

export { ProductsApi }