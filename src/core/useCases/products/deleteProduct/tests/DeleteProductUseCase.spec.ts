import { ICategoriesGateway } from "../../../../../communication/gateways/ICategoriesGateway"
import { IProductsGateway } from "../../../../../communication/gateways/IProductsGateway"
import { CategoriesRepositoryPostgres } from "../../../../../external/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { ProductsRepositoryPostgres } from "../../../../../external/datasource/typeorm/postgres/ProductsRepositoryPostgres"
import { CreateCategoryUseCase } from "../../../categories/createCategory/CreateCategoryUseCase"
import { CreateProductUseCase } from "../../createProduct/CreateProductUseCase"
import { DeleteProductUseCase } from "../DeleteProductUseCase"

let productsRepository : IProductsGateway
let categoriesRepository : ICategoriesGateway
let createCategoryeUse : CreateCategoryUseCase
let createProducteUse : CreateProductUseCase
let deleteProductUseCase: DeleteProductUseCase

describe('Products Use Case tests', ()=>{

    beforeAll(()=>{
        categoriesRepository = new CategoriesRepositoryPostgres()
        productsRepository = new ProductsRepositoryPostgres()
               
        createCategoryeUse = new CreateCategoryUseCase(categoriesRepository)                     
        createProducteUse = new CreateProductUseCase(productsRepository, categoriesRepository)
        deleteProductUseCase = new DeleteProductUseCase(productsRepository)
    })

    it('Should be able to delete a product', async () => {

        const category = await createCategoryeUse.execute({ name: 'Bebida', description: 'Bebida gelada' })
        
        const product = await createProducteUse.execute({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        })
        
        expect(category).toHaveProperty('id')

        const result = await deleteProductUseCase.execute(product.id)

        expect(result).toBeTruthy()

    })
})