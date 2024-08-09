import { Request, Response } from "express"
import { FindByIdCategoryController } from "../../../communication/controllers/categories/FindByIdCategoryController"
import { ListCategoriesController } from "../../../communication/controllers/categories/ListCategoriesController"
import { CreateCategoryController } from "../../../communication/controllers/categories/CreateCategoryController"
import { EditCategoryController } from "../../../communication/controllers/categories/EditCategoryController"
import { FindByNameCategoryController } from "../../../communication/controllers/categories/FindByNameCategoryController"
import { CategoryPresenter } from "../../../communication/presenters/CategoryPresenter"
import { DataSource } from "typeorm"
import { CreateCategoryUseCase } from "../../../application/useCases/categories/createCategory/CreateCategoryUseCase"
import { ListCategoriesUseCase } from "../../../application/useCases/categories/listCategories/ListCategoriesUseCase"
import { FindByIdCategoryUseCase } from "../../../application/useCases/categories/findByIdCategory/FindByIdCategoryUseCase"
import { EditCategoryUseCase } from "../../../application/useCases/categories/editCategory/EditCategoryUseCase"
import { FindByNameCategoryUseCase } from "../../../application/useCases/categories/findByNameCategory/FindByNameCategoryUseCase"

class CategoriesApi {

    constructor(
        private readonly dataSource: DataSource
    ) { }

    async list(request: Request, response: Response): Promise<Response> {

        const listCategoriesUseCase = new ListCategoriesUseCase(this.dataSource)
        const listCategoriesController = new ListCategoriesController(listCategoriesUseCase)

        try {
            const data = await listCategoriesController.handler()
            response.contentType('application/json')
            return response.status(200).send(CategoryPresenter.toJson(data))
        } catch (ex) {
            return response.status(400).json({ message: ex.message })
        }
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body
        const categoryUseCase = new CreateCategoryUseCase(this.dataSource)
        const createCategoryController = new CreateCategoryController(categoryUseCase)

        try {
            const data = await createCategoryController.handler({ name, description })
            response.contentType('application/json')
            return response.status(201).send(CategoryPresenter.toJson(data))
        }
        catch (ex) {
            return response.status(400).json({ message: ex.message })
        }
    }

    async findById(request: Request, response: Response): Promise<Response> {

        const { id } = request.params

        const findByIdCategoryUseCase = new FindByIdCategoryUseCase(this.dataSource)
        const findByIdCategoryController = new FindByIdCategoryController(findByIdCategoryUseCase)

        try {
            const data = await findByIdCategoryController.handler(parseInt(id))
            response.contentType('application/json')
            return response.status(200).send(CategoryPresenter.toJson(data))
        }
        catch (ex) {
            return response.status(400).json({ message: ex.message })
        }
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const { name, description } = request.body

        const editCategoryUseCase = new EditCategoryUseCase(this.dataSource)
        const editCategoryController = new EditCategoryController(editCategoryUseCase)

        const object = {
            id: parseInt(id),
            name,
            description
        }

        try {
            await editCategoryController.handler(object)
            return response.status(204).send()
        }
        catch (ex) {
            return response.status(400).json({ message: ex.message })
        }
    }

    async search(request: Request, response: Response): Promise<Response> {

        const { name } = request.query

        const findByNameCategoryUseCase = new FindByNameCategoryUseCase(this.dataSource)
        const findByNameCategoryController = new FindByNameCategoryController(findByNameCategoryUseCase)

        try {
            const data = await findByNameCategoryController.handler(name.toString())
            response.contentType('application/json')
            return response.status(200).send(CategoryPresenter.toJson(data))
        }
        catch (ex) {
            return response.status(400).json({ message: ex.message })
        }
    }
}

export { CategoriesApi }
