import { CategoriesRepositoryPostgres } from "../../../../infra/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { ProductsRepositoryPostgres } from "../../../../infra/datasource/typeorm/postgres/ProductsRepositoryPostgres"
import { ICategoriesGateway } from "../../../../communication/gateways/ICategoriesGateway"
import { IProductsGateway } from "../../../../communication/gateways/IProductsGateway"
import { CreateCategoryUseCase } from "../../../../application/useCases/categories/createCategory/CreateCategoryUseCase"
import { CreateProductUseCase } from "../../../../application/useCases/products/createProduct/CreateProductUseCase"
import { ListProductsUseCase } from "../../../../application/useCases/products/listProducts/ListProductsUseCase"

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