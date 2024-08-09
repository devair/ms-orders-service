import { CreateCategoryUseCase } from "../../../../application/useCases/categories/createCategory/CreateCategoryUseCase"
import { FindByIdCategoryUseCase } from "../../../../application/useCases/categories/findByIdCategory/FindByIdCategoryUseCase"
import { CreateProductUseCase } from "../../../../application/useCases/products/createProduct/CreateProductUseCase"
import { FindProductByCategoryNameUseCase } from "../../../../application/useCases/products/findProductByCategoryName/FindProductByCategoryNameUseCase"
import { AppDataSource } from "../../../../infra/datasource/typeorm"

let createProducteUse : CreateProductUseCase
let createCategoryeUseCase : CreateCategoryUseCase
let findProductByCategoryUseCase : FindProductByCategoryNameUseCase
describe('Products Use Case tests', ()=>{

    beforeAll(()=>{
        createCategoryeUseCase = new CreateCategoryUseCase(AppDataSource)
        createProducteUse = new CreateProductUseCase(AppDataSource) 
        findProductByCategoryUseCase = new FindProductByCategoryNameUseCase(AppDataSource)                    
    })

    it('Should be able to find a product by category name', async()=>{
        
        const category = await createCategoryeUseCase.execute({ name: 'Bebida', description: 'Bebida gelada' })
        
        const product = await createProducteUse.execute({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        })

        const products = await findProductByCategoryUseCase.execute(product.category.name)

        expect(products).toHaveLength(1)
    })

    it('Should not be able to find a product by category name', async ()=>{

        const products = await findProductByCategoryUseCase.execute('Nao Existe')

        expect(products).toHaveLength(0)
    })

})