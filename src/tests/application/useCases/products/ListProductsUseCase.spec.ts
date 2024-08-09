import { CreateCategoryUseCase } from "../../../../application/useCases/categories/createCategory/CreateCategoryUseCase"
import { CreateProductUseCase } from "../../../../application/useCases/products/createProduct/CreateProductUseCase"
import { ListProductsUseCase } from "../../../../application/useCases/products/listProducts/ListProductsUseCase"
import { AppDataSource } from "../../../../infra/datasource/typeorm"

let createProductUseCase : CreateProductUseCase
let createCategoryeUseCase: CreateCategoryUseCase
let listProductsUseCase: ListProductsUseCase

describe('Products Use Case tests', ()=>{

    beforeAll(()=>{
        createCategoryeUseCase = new CreateCategoryUseCase(AppDataSource)
        createProductUseCase = new CreateProductUseCase(AppDataSource) 
        listProductsUseCase = new ListProductsUseCase(AppDataSource)             
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