import { CategoriesRepositoryInMemory } from "../../../../../external/datasource/in-memory/CategoriesRepositoryInMemory"
import { ProductsRepositoryInMemory } from "../../../../../external/datasource/in-memory/ProductsRepositoryInMemory"
import { CreateCategoryUseCase } from "../../../categories/createCategory/CreateCategoryUseCase"
import { FindByIdCategoryUseCase } from "../../../categories/findByIdCategory/FindByIdCategoryUseCase"
import { CreateProductUseCase } from "../../createProduct/CreateProductUseCase"
import { FindByIdProductUseCase } from "../../findByIdProduct/FindByIdProductUseCase"
import { EditProductUseCase } from "../EditProductUseCase"

let createCategoryeUseCase: CreateCategoryUseCase
let findByIdCategoryUseCase: FindByIdCategoryUseCase
let createProducteUse: CreateProductUseCase
let findByIdProductUseCase: FindByIdProductUseCase
let editProductUseCase: EditProductUseCase

describe('Products Service tests', () => {
    beforeEach(() => {        
        const categoriesRepository = new CategoriesRepositoryInMemory()
        createCategoryeUseCase = new CreateCategoryUseCase(categoriesRepository)    
        findByIdCategoryUseCase = new FindByIdCategoryUseCase(categoriesRepository)

        const productsRepository = new ProductsRepositoryInMemory(categoriesRepository)
        createProducteUse = new CreateProductUseCase(productsRepository, categoriesRepository) 
        findByIdProductUseCase = new FindByIdProductUseCase(productsRepository)    
        editProductUseCase = new EditProductUseCase(productsRepository,categoriesRepository)
    })  

    it('Should be able to edit an product', async () => {

        const category = await createCategoryeUseCase.execute({ name: 'Bebida', description: 'Bebida gelada' })        
        const product = await createProducteUse.execute({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        })
        
        const productCreated = await findByIdProductUseCase.execute(product.id)
        
        productCreated.description = 'New description'

        const { id, code, name, description, categoryId, price, image } = productCreated

        const productChanged = await editProductUseCase.execute({ id, code, name, description, categoryId, price, image })

        expect(productChanged.description).toBe(productCreated.description)

    })

})