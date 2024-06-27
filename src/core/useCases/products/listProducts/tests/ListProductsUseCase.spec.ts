import { CategoriesRepositoryInMemory } from "../../../../../external/datasource/in-memory/CategoriesRepositoryInMemory"
import { ProductsRepositoryInMemory } from "../../../../../external/datasource/in-memory/ProductsRepositoryInMemory"
import { CreateCategoryUseCase } from "../../../categories/createCategory/CreateCategoryUseCase"
import { FindByIdCategoryUseCase } from "../../../categories/findByIdCategory/FindByIdCategoryUseCase"
import { CreateProductUseCase } from "../../createProduct/CreateProductUseCase"
import { ListProductsUseCase } from "../ListProductsUseCase"

let createProductUseCase : CreateProductUseCase
let createCategoryeUseCase: CreateCategoryUseCase
let listProductsUseCase: ListProductsUseCase
let findByIdCategoryUseCase: FindByIdCategoryUseCase

describe('Products Use Case tests', ()=>{

    beforeEach(()=>{
        const categoriesRepository = new CategoriesRepositoryInMemory()
        findByIdCategoryUseCase = new FindByIdCategoryUseCase(categoriesRepository)       
        createCategoryeUseCase = new CreateCategoryUseCase(categoriesRepository)  

        const productsRepository = new ProductsRepositoryInMemory(categoriesRepository)
        createProductUseCase = new CreateProductUseCase(productsRepository,categoriesRepository)             
        listProductsUseCase = new ListProductsUseCase(productsRepository)             
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