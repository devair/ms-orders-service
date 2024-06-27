import { CategoriesRepositoryInMemory } from "../../../../../external/datasource/in-memory/CategoriesRepositoryInMemory"
import { CreateCategoryUseCase } from "../../createCategory/CreateCategoryUseCase"
import { ListCategoriesUseCase } from "../ListCategoriesUseCase"

let createCategoryeUse : CreateCategoryUseCase
let listCategoriesUseCase: ListCategoriesUseCase

describe('Categories Use Case tests', ()=>{

    beforeEach(()=>{
        const categoriesRepository = new CategoriesRepositoryInMemory()
        createCategoryeUse = new CreateCategoryUseCase(categoriesRepository)             
        listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)             
    })

    it('Should be able to list categories', async()=>{         
        await createCategoryeUse.execute( {name: 'Bebida', description: 'Bebidas'} )      
        
        const categories = await listCategoriesUseCase.execute()
        
        expect(categories.length).toBeGreaterThanOrEqual(1)
    })  

})