import { ICategoriesGateway } from "../../../../../communication/gateways/ICategoriesGateway"
import { IProductsGateway } from "../../../../../communication/gateways/IProductsGateway"
import { CategoriesRepositoryPostgres } from "../../../../../external/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { ProductsRepositoryPostgres } from "../../../../../external/datasource/typeorm/postgres/ProductsRepositoryPostgres"
import { CreateCategoryUseCase } from "../../../categories/createCategory/CreateCategoryUseCase"
import { CreateProductUseCase } from "../../createProduct/CreateProductUseCase"
import { FindByIdProductUseCase } from "../FindByIdProductUseCase"

let productsRepository : IProductsGateway
let categoriesRepository : ICategoriesGateway
let createProducteUse : CreateProductUseCase
let createCategoryeUseCase : CreateCategoryUseCase
let findByIdProductUseCase : FindByIdProductUseCase
describe('Products Use Case tests', ()=>{

   
    beforeAll(()=>{
        categoriesRepository = new CategoriesRepositoryPostgres()
        productsRepository = new ProductsRepositoryPostgres()

        createCategoryeUseCase = new CreateCategoryUseCase(categoriesRepository)
        createProducteUse = new CreateProductUseCase(productsRepository, categoriesRepository) 
        findByIdProductUseCase = new FindByIdProductUseCase(productsRepository)                    
    })

    it('Should be able to find a product by id', async()=>{
        
        const category = await createCategoryeUseCase.execute({ name: 'Bebida', description: 'Bebida gelada' })
        
        const product = await createProducteUse.execute({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        })
        expect(product).toHaveProperty('id')

        const productFound = await findByIdProductUseCase.execute(product.id)

        expect(productFound).not.toBeUndefined()

    })

    it('Should not be able to find a Product by id', async ()=>{

        expect(async ()=>{               
            await findByIdProductUseCase.execute(99)         
        }).rejects.toBeInstanceOf(Error)

    })

})