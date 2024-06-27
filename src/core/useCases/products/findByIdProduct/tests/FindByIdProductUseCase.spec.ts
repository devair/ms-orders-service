import { CategoriesRepositoryInMemory } from "../../../../../external/datasource/in-memory/CategoriesRepositoryInMemory"
import { ProductsRepositoryInMemory } from "../../../../../external/datasource/in-memory/ProductsRepositoryInMemory"
import { CreateCategoryUseCase } from "../../../categories/createCategory/CreateCategoryUseCase"
import { FindByIdCategoryUseCase } from "../../../categories/findByIdCategory/FindByIdCategoryUseCase"
import { CreateProductUseCase } from "../../createProduct/CreateProductUseCase"
import { FindByIdProductUseCase } from "../FindByIdProductUseCase"

let createProducteUse : CreateProductUseCase
let createCategoryeUseCase : CreateCategoryUseCase
let findByIdProductUseCase : FindByIdProductUseCase
let findByIdCategoryUseCase: FindByIdCategoryUseCase
describe('Products Use Case tests', ()=>{

    beforeEach(()=>{
        const categoriesRepository = new CategoriesRepositoryInMemory()
        createCategoryeUseCase = new CreateCategoryUseCase(categoriesRepository)    
        findByIdCategoryUseCase = new FindByIdCategoryUseCase(categoriesRepository)

        const productsRepository = new ProductsRepositoryInMemory(categoriesRepository)
        createProducteUse = new CreateProductUseCase(productsRepository, categoriesRepository) 
        findByIdProductUseCase = new FindByIdProductUseCase(productsRepository)                    
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