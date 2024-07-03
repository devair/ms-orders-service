import { CategoriesRepositoryInMemory } from "../../../../../external/datasource/in-memory/CategoriesRepositoryInMemory"
import { ProductsRepositoryInMemory } from "../../../../../external/datasource/in-memory/ProductsRepositoryInMemory"
import { CreateCategoryUseCase } from "../../../categories/createCategory/CreateCategoryUseCase"
import { FindByIdCategoryUseCase } from "../../../categories/findByIdCategory/FindByIdCategoryUseCase"
import { CreateProductUseCase } from "../CreateProductUseCase"

let createCategoryeUse : CreateCategoryUseCase
let createProducteUse : CreateProductUseCase
let findByIdCategoryUseCase: FindByIdCategoryUseCase

describe('Products Use Case tests', ()=>{

    beforeEach(()=>{
        const categoriesRepository = new CategoriesRepositoryInMemory()
        const productsRepository = new ProductsRepositoryInMemory(categoriesRepository)
               
        createCategoryeUse = new CreateCategoryUseCase(categoriesRepository)             
        findByIdCategoryUseCase = new FindByIdCategoryUseCase(categoriesRepository)
        createProducteUse = new CreateProductUseCase(productsRepository, categoriesRepository)
    })

    it('Should be able to create a new product with category', async () => {

        const category = await createCategoryeUse.execute({ name: 'Bebida', description: 'Bebida gelada' })
        
        const product = await createProducteUse.execute({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        })
        
        expect(product).toHaveProperty('id')

    })

    it('Should not be able to duplicated a product', async ()=>{
        
        const category = await createCategoryeUse.execute({ name: 'Bebida', description: 'Bebida gelada' })
        
        const product = await createProducteUse.execute({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        })

        expect(async ()=>{    
            
            const categoryCreated = await findByIdCategoryUseCase.execute(category.id)

            await createProducteUse.execute({
                name: 'produto1', code: product.code , description: 'teste',
                price: 1, categoryId: categoryCreated.id, image: ''
            })

        }).rejects.toBeInstanceOf(Error)

    })
})