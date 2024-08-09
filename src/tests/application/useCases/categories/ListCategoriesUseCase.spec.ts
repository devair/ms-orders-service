import { CreateCategoryUseCase } from "../../../../application/useCases/categories/createCategory/CreateCategoryUseCase"
import { ListCategoriesUseCase } from "../../../../application/useCases/categories/listCategories/ListCategoriesUseCase"
import { AppDataSource } from "../../../../infra/datasource/typeorm"


let createCategoryeUse : CreateCategoryUseCase
let listCategoriesUseCase: ListCategoriesUseCase

describe('Categories Use Case tests', ()=>{

    beforeEach(()=>{        
        createCategoryeUse = new CreateCategoryUseCase(AppDataSource)             
        listCategoriesUseCase = new ListCategoriesUseCase(AppDataSource)             
    })

    it('Should be able to list categories', async()=>{         
        await createCategoryeUse.execute( {name: 'Bebida', description: 'Bebidas'} )      
        
        const categories = await listCategoriesUseCase.execute()
        
        expect(categories.length).toBeGreaterThanOrEqual(1)
    })  

})