import { Product } from "../../../../core/entities/Product"
import { CreateCategoryUseCase } from "../../../../application/useCases/categories/createCategory/CreateCategoryUseCase"
import { CreateProductUseCase } from "../../../../application/useCases/products/createProduct/CreateProductUseCase"
import { AppDataSource } from "../../../../infra/datasource/typeorm"
import { OutputCreateCategoryDTO } from "../../../../application/dtos/categories/ICreateCategoryDTO"

let createCategoryeUse : CreateCategoryUseCase
let createProducteUse : CreateProductUseCase
let category: OutputCreateCategoryDTO
let product: Product

describe('Products Use Case tests', ()=>{

    beforeAll(()=> {              
        createCategoryeUse = new CreateCategoryUseCase(AppDataSource)             
        createProducteUse = new CreateProductUseCase(AppDataSource)
    })

    it('Should be able to create a new product with category', async () => {

        category = await createCategoryeUse.execute( {name: 'Bebida', description: 'Bebidas'})
        
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