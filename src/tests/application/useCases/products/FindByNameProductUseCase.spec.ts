import { CreateCategoryUseCase } from "../../../../application/useCases/categories/CreateCategoryUseCase"
import { CreateProductUseCase } from "../../../../application/useCases/products/CreateProductUseCase"
import { FindByNameProductUseCase } from "../../../../application/useCases/products/FindByNameProductUseCase"
import { AppDataSource } from "../../../../infra/datasource/typeorm"

let createProducteUse : CreateProductUseCase
let createCategoryeUseCase : CreateCategoryUseCase
let findByNameProductUseCase : FindByNameProductUseCase

describe('Products Use Case tests', ()=>{

    beforeAll(()=>{
        createCategoryeUseCase = new CreateCategoryUseCase(AppDataSource)
        createProducteUse = new CreateProductUseCase(AppDataSource) 
        findByNameProductUseCase = new FindByNameProductUseCase(AppDataSource)                    
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