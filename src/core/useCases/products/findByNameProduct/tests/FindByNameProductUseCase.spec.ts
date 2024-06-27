import { CategoriesRepositoryInMemory } from "../../../../../external/datasource/in-memory/CategoriesRepositoryInMemory"
import { ProductsRepositoryInMemory } from "../../../../../external/datasource/in-memory/ProductsRepositoryInMemory"
import { CreateCategoryUseCase } from "../../../categories/createCategory/CreateCategoryUseCase"
import { FindByIdCategoryUseCase } from "../../../categories/findByIdCategory/FindByIdCategoryUseCase"
import { CreateProductUseCase } from "../../createProduct/CreateProductUseCase"
import { FindByNameProductUseCase } from "../FindByNameProductUseCase"

let createProducteUse : CreateProductUseCase
let createCategoryeUseCase : CreateCategoryUseCase
let findByNameProductUseCase : FindByNameProductUseCase
let findByIdCategoryUseCase: FindByIdCategoryUseCase
describe('Products Use Case tests', ()=>{

    beforeEach(()=>{
        const categoriesRepository = new CategoriesRepositoryInMemory()
        createCategoryeUseCase = new CreateCategoryUseCase(categoriesRepository)    
        findByIdCategoryUseCase = new FindByIdCategoryUseCase(categoriesRepository)

        const productsRepository = new ProductsRepositoryInMemory(categoriesRepository)
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