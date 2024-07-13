import { CategoriesRepositoryPostgres } from "../../../../adapters/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { ProductsRepositoryPostgres } from "../../../../adapters/datasource/typeorm/postgres/ProductsRepositoryPostgres"
import { ICategoriesGateway } from "../../../../communication/gateways/ICategoriesGateway"
import { IProductsGateway } from "../../../../communication/gateways/IProductsGateway"
import { CreateCategoryUseCase } from "../../../../core/useCases/categories/createCategory/CreateCategoryUseCase"
import { FindByIdCategoryUseCase } from "../../../../core/useCases/categories/findByIdCategory/FindByIdCategoryUseCase"
import { CreateProductUseCase } from "../../../../core/useCases/products/createProduct/CreateProductUseCase"
import { FindProductByCategoryNameUseCase } from "../../../../core/useCases/products/findProductByCategoryName/FindProductByCategoryNameUseCase"

let productsRepository : IProductsGateway
let categoriesRepository : ICategoriesGateway
let createProducteUse : CreateProductUseCase
let createCategoryeUseCase : CreateCategoryUseCase
let findProductByCategoryUseCase : FindProductByCategoryNameUseCase
let findByIdCategoryUseCase: FindByIdCategoryUseCase
describe('Products Use Case tests', ()=>{

    beforeAll(()=>{
        categoriesRepository = new CategoriesRepositoryPostgres()
        productsRepository = new ProductsRepositoryPostgres()

        createCategoryeUseCase = new CreateCategoryUseCase(categoriesRepository)
        createProducteUse = new CreateProductUseCase(productsRepository, categoriesRepository) 
        findProductByCategoryUseCase = new FindProductByCategoryNameUseCase(productsRepository)                    
    })

    it('Should be able to find a product by category name', async()=>{
        
        const category = await createCategoryeUseCase.execute({ name: 'Bebida', description: 'Bebida gelada' })
        
        const product = await createProducteUse.execute({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        })

        const products = await findProductByCategoryUseCase.execute(product.category.name)

        expect(products).toHaveLength(1)
    })

    it('Should not be able to find a product by category name', async ()=>{

        const products = await findProductByCategoryUseCase.execute('Nao Existe')

        expect(products).toHaveLength(0)
    })

})