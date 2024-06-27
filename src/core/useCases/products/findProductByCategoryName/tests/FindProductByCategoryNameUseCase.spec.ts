import { CategoriesRepositoryInMemory } from "../../../../../external/datasource/in-memory/CategoriesRepositoryInMemory"
import { ProductsRepositoryInMemory } from "../../../../../external/datasource/in-memory/ProductsRepositoryInMemory"
import { CreateCategoryUseCase } from "../../../categories/createCategory/CreateCategoryUseCase"
import { FindByIdCategoryUseCase } from "../../../categories/findByIdCategory/FindByIdCategoryUseCase"
import { CreateProductUseCase } from "../../createProduct/CreateProductUseCase"
import { FindProductByCategoryNameUseCase } from "../FindProductByCategoryNameUseCase"

let createProducteUse : CreateProductUseCase
let createCategoryeUseCase : CreateCategoryUseCase
let findProductByCategoryUseCase : FindProductByCategoryNameUseCase
let findByIdCategoryUseCase: FindByIdCategoryUseCase
describe('Products Use Case tests', ()=>{

    beforeEach(()=>{
        const categoriesRepository = new CategoriesRepositoryInMemory()
        createCategoryeUseCase = new CreateCategoryUseCase(categoriesRepository)    
        findByIdCategoryUseCase = new FindByIdCategoryUseCase(categoriesRepository)

        const productsRepository = new ProductsRepositoryInMemory(categoriesRepository)
        createProducteUse = new CreateProductUseCase(productsRepository, categoriesRepository) 
        findProductByCategoryUseCase = new FindProductByCategoryNameUseCase(productsRepository)                    
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