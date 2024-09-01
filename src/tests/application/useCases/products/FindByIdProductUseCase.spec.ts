import { ICategoriesGateway } from "../../../../communication/gateways/ICategoriesGateway"
import { IProductsGateway } from "../../../../communication/gateways/IProductsGateway"
import { CreateCategoryUseCase } from "../../../../application/useCases/categories/CreateCategoryUseCase"
import { CreateProductUseCase } from "../../../../application/useCases/products/CreateProductUseCase"
import { FindByIdProductUseCase } from "../../../../application/useCases/products/FindByIdProductUseCase"
import { AppDataSource } from "../../../../infra/datasource/typeorm"

let createProducteUse : CreateProductUseCase
let createCategoryeUseCase : CreateCategoryUseCase
let findByIdProductUseCase : FindByIdProductUseCase
describe('Products Use Case tests', ()=>{

   
    beforeAll(()=>{
        createCategoryeUseCase = new CreateCategoryUseCase(AppDataSource)
        createProducteUse = new CreateProductUseCase(AppDataSource) 
        findByIdProductUseCase = new FindByIdProductUseCase(AppDataSource)                    
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