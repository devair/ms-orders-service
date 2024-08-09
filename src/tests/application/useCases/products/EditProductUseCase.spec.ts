import { CategoriesRepositoryPostgres } from "../../../../infra/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { ProductsRepositoryPostgres } from "../../../../infra/datasource/typeorm/postgres/ProductsRepositoryPostgres"
import { ICategoriesGateway } from "../../../../communication/gateways/ICategoriesGateway"
import { IProductsGateway } from "../../../../communication/gateways/IProductsGateway"
import { Product } from "../../../../core/entities/Product"
import { CreateCategoryUseCase } from "../../../../application/useCases/categories/createCategory/CreateCategoryUseCase"
import { CreateProductUseCase } from "../../../../application/useCases/products/createProduct/CreateProductUseCase"
import { EditProductUseCase } from "../../../../application/useCases/products/editProduct/EditProductUseCase"
import { FindByIdProductUseCase } from "../../../../application/useCases/products/findByIdProduct/FindByIdProductUseCase"

let productsRepository: IProductsGateway
let categoriesRepository: ICategoriesGateway
let createCategoryeUseCase: CreateCategoryUseCase
let createProducteUse: CreateProductUseCase
let findByIdProductUseCase: FindByIdProductUseCase
let editProductUseCase: EditProductUseCase
let product: Product

describe('Products Service tests', () => {
    beforeAll(() => {
        categoriesRepository = new CategoriesRepositoryPostgres()
        productsRepository = new ProductsRepositoryPostgres()
        createProducteUse = new CreateProductUseCase(productsRepository, categoriesRepository)
        createCategoryeUseCase = new CreateCategoryUseCase(categoriesRepository)
        findByIdProductUseCase = new FindByIdProductUseCase(productsRepository)
        editProductUseCase = new EditProductUseCase(productsRepository, categoriesRepository)
    })

    it('Should be able to edit an product', async () => {

        const category = await createCategoryeUseCase.execute({ name: 'Bebida', description: 'Bebida gelada' })
        const productCreated = await createProducteUse.execute({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        })

        let { id, code, name, categoryId, price, image } = productCreated

        let description = 'New description'

        const productChanged = await editProductUseCase.execute({ id, code, name, categoryId, description, price, image })

        expect(productChanged.description).not.toBe(productCreated.description)

        product = new Product()
        Object.assign(product, productChanged)

    })

    it('Should not be able to edite non exists product', async () => {

        expect(async () => {
            await editProductUseCase.execute({
                id: 999,
                name: 'produto1', code: '1', description: 'teste',
                price: 1, categoryId: 99, image: ''
            })

        }).rejects.toBeInstanceOf(Error)

    })

    it('Should not be able to edite non exists product', async () => {

        expect(async () => {

            let { id, code, name, description, price, image } = product
            let categoryId = 999
            await editProductUseCase.execute({ id, code, name, description, categoryId, price, image })

        }).rejects.toBeInstanceOf(Error)
    })
})