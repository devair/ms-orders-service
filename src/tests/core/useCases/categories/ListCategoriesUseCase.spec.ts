import { CategoriesRepositoryPostgres } from "../../../../adapters/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { CreateCategoryUseCase } from "../../../../core/useCases/categories/createCategory/CreateCategoryUseCase"
import { ListCategoriesUseCase } from "../../../../core/useCases/categories/listCategories/ListCategoriesUseCase"


let createCategoryeUse : CreateCategoryUseCase
let listCategoriesUseCase: ListCategoriesUseCase

describe('Categories Use Case tests', ()=>{

    beforeEach(()=>{
        const categoriesRepository = new CategoriesRepositoryPostgres()
        createCategoryeUse = new CreateCategoryUseCase(categoriesRepository)             
        listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)             
    })

    it('Should be able to list categories', async()=>{         
        await createCategoryeUse.execute( {name: 'Bebida', description: 'Bebidas'} )      
        
        const categories = await listCategoriesUseCase.execute()
        
        expect(categories.length).toBeGreaterThanOrEqual(1)
    })  

})