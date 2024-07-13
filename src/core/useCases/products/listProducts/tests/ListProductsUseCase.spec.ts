import { ICategoriesGateway } from "../../../../../communication/gateways/ICategoriesGateway"
import { IProductsGateway } from "../../../../../communication/gateways/IProductsGateway"
import { CategoriesRepositoryPostgres } from "../../../../../adapters/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { ProductsRepositoryPostgres } from "../../../../../adapters/datasource/typeorm/postgres/ProductsRepositoryPostgres"
import { CreateCategoryUseCase } from "../../../categories/createCategory/CreateCategoryUseCase"
import { CreateProductUseCase } from "../../createProduct/CreateProductUseCase"
import { ListProductsUseCase } from "../ListProductsUseCase"

let productsRepository : IProductsGateway
let categoriesRepository : ICategoriesGateway
let createProductUseCase : CreateProductUseCase
let createCategoryeUseCase: CreateCategoryUseCase
let listProductsUseCase: ListProductsUseCase


describe('Products Use Case tests', ()=>{

    beforeAll(()=>{
        categoriesRepository = new CategoriesRepositoryPostgres()
        productsRepository = new ProductsRepositoryPostgres()

        createCategoryeUseCase = new CreateCategoryUseCase(categoriesRepository)
        createProductUseCase = new CreateProductUseCase(productsRepository, categoriesRepository) 
        listProductsUseCase = new ListProductsUseCase(productsRepository)             
    })

    it('Should be able to list products', async()=>{     
        const category = await createCategoryeUseCase.execute({ name: 'Bebida', description: 'Bebida gelada' })
        
        await createProductUseCase.execute({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        })    
        
        const products = await listProductsUseCase.execute()
        
        expect(products.length).toBeGreaterThanOrEqual(1)
    })  

})