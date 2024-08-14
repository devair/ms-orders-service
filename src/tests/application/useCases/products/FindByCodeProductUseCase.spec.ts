import { CreateCategoryUseCase } from "../../../../application/useCases/categories/CreateCategoryUseCase"
import { CreateProductUseCase } from "../../../../application/useCases/products/CreateProductUseCase"
import { FindByCodeProductUseCase } from "../../../../application/useCases/products/FindByCodeProductUseCase"
import { AppDataSource } from "../../../../infra/datasource/typeorm"

let createProducteUse : CreateProductUseCase
let createCategoryeUseCase : CreateCategoryUseCase
let findByCodeProductUseCase : FindByCodeProductUseCase

describe('Products Use Case tests', ()=>{

    beforeAll(()=>{
        createCategoryeUseCase = new CreateCategoryUseCase(AppDataSource)            
        createProducteUse = new CreateProductUseCase(AppDataSource) 
        findByCodeProductUseCase = new FindByCodeProductUseCase(AppDataSource)                    
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