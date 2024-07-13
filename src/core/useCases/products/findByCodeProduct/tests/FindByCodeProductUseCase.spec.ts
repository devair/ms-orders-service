import { ICategoriesGateway } from "../../../../../communication/gateways/ICategoriesGateway"
import { IProductsGateway } from "../../../../../communication/gateways/IProductsGateway"
import { CategoriesRepositoryPostgres } from "../../../../../external/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { ProductsRepositoryPostgres } from "../../../../../external/datasource/typeorm/postgres/ProductsRepositoryPostgres"
import { CreateCategoryUseCase } from "../../../categories/createCategory/CreateCategoryUseCase"
import { CreateProductUseCase } from "../../createProduct/CreateProductUseCase"
import { FindByCodeProductUseCase } from "../FindByCodeProductUseCase"

let categoriesRepository: ICategoriesGateway
let productsRepository: IProductsGateway
let createProducteUse : CreateProductUseCase
let createCategoryeUseCase : CreateCategoryUseCase
let findByCodeProductUseCase : FindByCodeProductUseCase

describe('Products Use Case tests', ()=>{

    beforeAll(()=>{
        categoriesRepository = new CategoriesRepositoryPostgres()
        productsRepository = new ProductsRepositoryPostgres()

        createCategoryeUseCase = new CreateCategoryUseCase(categoriesRepository)            
        createProducteUse = new CreateProductUseCase(productsRepository, categoriesRepository) 
        findByCodeProductUseCase = new FindByCodeProductUseCase(productsRepository)                    
    })

    it('Should be able to find a product by code', async()=>{
        
        const category = await createCategoryeUseCase.execute({ name: 'Bebida', description: 'Bebida gelada' })
        
        const product = await createProducteUse.execute({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        })

        const productFound = await findByCodeProductUseCase.execute(product.code)

        expect(productFound).not.toBeUndefined()
    })

    it('Should not be able to find a product by code', async ()=>{

        expect(async ()=>{    
            await findByCodeProductUseCase.execute('2222')
        }).rejects.toBeInstanceOf(Error)

    })

})