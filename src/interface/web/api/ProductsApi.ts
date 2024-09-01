import { Request, Response } from "express"
import { CreateProductController } from "../../../communication/controllers/products/CreateProductController"
import { ListProductsController } from "../../../communication/controllers/products/ListProductsController"
import { FindByIdProductController } from "../../../communication/controllers/products/FindByIdProductController"
import { SearchProductsController } from "../../../communication/controllers/products/SearchProductsController"
import { DeleteProductController } from "../../../communication/controllers/products/DeleteProductController"
import { EditProductController } from "../../../communication/controllers/products/EditProductController"
import { ProductPresenter } from "../../../communication/presenters/ProductPresenter"
import { DataSource } from "typeorm"
import { CreateProductUseCase } from "../../../application/useCases/products/CreateProductUseCase"
import { ListProductsUseCase } from "../../../application/useCases/products/ListProductsUseCase"
import { FindByIdProductUseCase } from "../../../application/useCases/products/FindByIdProductUseCase"
import { FindByCodeProductUseCase } from "../../../application/useCases/products/FindByCodeProductUseCase"
import { FindByNameProductUseCase } from "../../../application/useCases/products/FindByNameProductUseCase"
import { FindProductByCategoryNameUseCase } from "../../../application/useCases/products/FindProductByCategoryNameUseCase"
import { DeleteProductUseCase } from "../../../application/useCases/products/DeleteProductUseCase"
import { EditProductUseCase } from "../../../application/useCases/products/EditProductUseCase"


class ProductsApi {


    constructor(
        private readonly dataSource: DataSource
    ) { }

    async create(request: Request, response: Response): Promise<Response> {

        const { code, name, description, categoryId, price, image } = request.body

        const createProductUseCase = new CreateProductUseCase(this.dataSource)
        const createProductController = new CreateProductController(createProductUseCase)

        try {
            const data = await createProductController.handler({
                code, name, description,
                categoryId, price, image
            })
            response.contentType('application/json')
            return response.status(201).send(ProductPresenter.toJson(data))
        }
        catch (ex) {
            return response.status(400).json({ message: ex.message })
        }
    }

    async list(request: Request, response: Response): Promise<Response> {

        const listProductsUseCase = new ListProductsUseCase(this.dataSource)
        const listProductsController = new ListProductsController(listProductsUseCase)

        try {
            const data = await listProductsController.handler()
            response.contentType('application/json')
            return response.status(200).send(ProductPresenter.toJson(data))

        } catch (ex) {
            return response.status(400).json({ message: ex.message })
        }
    }

    async findById(request: Request, response: Response): Promise<Response> {

        const { id } = request.params

        const findByIdProductUseCase = new FindByIdProductUseCase(this.dataSource)
        const findByIdProductController = new FindByIdProductController(findByIdProductUseCase)

        try {
            const data = await findByIdProductController.handler(parseInt(id))
            response.contentType('application/json')
            return response.status(200).send(ProductPresenter.toJson(data))
        }
        catch (ex) {
            return response.status(400).json({ message: ex.message })
        }
    }

    async search(request: Request, response: Response): Promise<Response> {

        const { name, categoryName, code } = request.query as { [key: string]: string }

        const findByNameProductUseCase = new FindByNameProductUseCase(this.dataSource)
        const findProductByCategoryNameUseCase = new FindProductByCategoryNameUseCase(this.dataSource)
        const findByCodeProductUseCase = new FindByCodeProductUseCase(this.dataSource)

        const searchProductsController = new SearchProductsController(
            findByNameProductUseCase,
            findProductByCategoryNameUseCase,
            findByCodeProductUseCase
        )

        try {
            const data = await searchProductsController.handler(name, categoryName, code)
            response.contentType('application/json')
            return response.status(200).send(ProductPresenter.toJson(data))
        }
        catch (ex) {
            return response.status(400).json({ message: ex.message })
        }
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params

        const deleteProductUseCase = new DeleteProductUseCase(this.dataSource)
        const deleteProductController = new DeleteProductController(deleteProductUseCase)

        try {
            await deleteProductController.handler(parseInt(id))
            return response.status(204).send()
        }
        catch (ex) {
            return response.status(400).json({ message: ex.message })
        }
    }

    async update(request: Request, response: Response): Promise<Response> {

        const { id } = request.params

        const editProductUseCase = new EditProductUseCase(this.dataSource)
        const editCategoryController = new EditProductController(editProductUseCase)

        const { code, name, description, categoryId, price, image } = request.body

        try {
            await editCategoryController.handler({ id: parseInt(id), code, name, description, categoryId, price, image })
            return response.status(204).send()
        }
        catch (ex) {
            return response.status(400).json({ message: ex.message })
        }
    }
}

export { ProductsApi }