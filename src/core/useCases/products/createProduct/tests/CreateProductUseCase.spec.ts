import { ICategoriesGateway } from "../../../../../communication/gateways/ICategoriesGateway"
import { IProductsGateway } from "../../../../../communication/gateways/IProductsGateway"
import { CategoriesRepositoryPostgres } from "../../../../../adapters/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { ProductsRepositoryPostgres } from "../../../../../adapters/datasource/typeorm/postgres/ProductsRepositoryPostgres"
import { Category } from "../../../../entities/Category"
import { Product } from "../../../../entities/Product"
import { CreateCategoryUseCase } from "../../../categories/createCategory/CreateCategoryUseCase"
import { CreateProductUseCase } from "../CreateProductUseCase"

let productsRepository : IProductsGateway
let categoriesRepository : ICategoriesGateway
let createCategoryeUse : CreateCategoryUseCase
let createProducteUse : CreateProductUseCase
let category: Category
let product: Product

describe('Products Use Case tests', ()=>{

    beforeAll(()=>{
        categoriesRepository = new CategoriesRepositoryPostgres()
        productsRepository = new ProductsRepositoryPostgres()
               
        createCategoryeUse = new CreateCategoryUseCase(categoriesRepository)             
        createProducteUse = new CreateProductUseCase(productsRepository, categoriesRepository)
    })

    it('Should be able to create a new product with category', async () => {

        category = await categoriesRepository.create( {name: 'Bebida', description: 'Bebidas'})
        
        const productCreated = await createProducteUse.execute({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        })

        product = new Product()
        
        Object.assign(product, productCreated)
        
        expect(productCreated).toHaveProperty('id')

    })

    it('Should not be able to duplicated a product', async ()=>{        

        expect(async ()=>{                            
            await createProducteUse.execute({
                name: 'produto1', code: '1' , description: 'teste',
                price: 1, categoryId: category.id, image: ''
            })

        }).rejects.toBeInstanceOf(Error)

    })

    it('Should be able to create a new product with non existed category', async () => {

        expect(async ()=>{ 
            await createProducteUse.execute({
                name: 'produto1', code: '1', description: 'teste',
                price: 1, categoryId: 999, image: ''
            })
        }).rejects.toBeInstanceOf(Error)

    })
})