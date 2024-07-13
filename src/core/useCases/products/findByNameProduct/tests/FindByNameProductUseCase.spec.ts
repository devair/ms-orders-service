import { ICategoriesGateway } from "../../../../../communication/gateways/ICategoriesGateway"
import { IProductsGateway } from "../../../../../communication/gateways/IProductsGateway"
import { CategoriesRepositoryPostgres } from "../../../../../adapters/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { ProductsRepositoryPostgres } from "../../../../../adapters/datasource/typeorm/postgres/ProductsRepositoryPostgres"
import { CreateCategoryUseCase } from "../../../categories/createCategory/CreateCategoryUseCase"
import { CreateProductUseCase } from "../../createProduct/CreateProductUseCase"
import { FindByNameProductUseCase } from "../FindByNameProductUseCase"

let productsRepository : IProductsGateway
let categoriesRepository : ICategoriesGateway
let createProducteUse : CreateProductUseCase
let createCategoryeUseCase : CreateCategoryUseCase
let findByNameProductUseCase : FindByNameProductUseCase

describe('Products Use Case tests', ()=>{

    beforeAll(()=>{
        categoriesRepository = new CategoriesRepositoryPostgres()
        productsRepository = new ProductsRepositoryPostgres()

        createCategoryeUseCase = new CreateCategoryUseCase(categoriesRepository)
        createProducteUse = new CreateProductUseCase(productsRepository, categoriesRepository) 
        findByNameProductUseCase = new FindByNameProductUseCase(productsRepository)                    
    })

    it('Should be able to find a product by name', async()=>{
        
        const category = await createCategoryeUseCase.execute({ name: 'Bebida', description: 'Bebida gelada' })
        
        const product = await createProducteUse.execute({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        })
        expect(product).toHaveProperty('id')

        const products = await findByNameProductUseCase.execute(product.name)

        expect(products.length).toBe(1)
    })

    it('Should not be able to find a Product by id', async ()=>{

        const products = await findByNameProductUseCase.execute('Nao exite')        
        expect(products.length).toBe(0)
    })

})