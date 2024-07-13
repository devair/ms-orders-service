import { CategoriesRepositoryPostgres } from "../../../../../external/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { CreateCategoryUseCase } from "../CreateCategoryUseCase"

let createCategoryeUse : CreateCategoryUseCase

describe('Categories Service tests', ()=>{

    beforeEach(()=>{
        const categoriesRepository = new CategoriesRepositoryPostgres()
        createCategoryeUse = new CreateCategoryUseCase(categoriesRepository)             
    })

    it('Should be able to create a new category', async()=>{
        const category = await createCategoryeUse.execute( {name: 'Bebida', description: 'Bebidas'})

        expect(category).toHaveProperty('id')
    })    

    it('Should not be able to duplicated a category', async ()=>{

        expect(async ()=>{    
            
           await createCategoryeUse.execute( {name: 'Bebida', description: 'Bebidas'} ) 

           await createCategoryeUse.execute( {name: 'Bebida', description: 'Bebidas'} ) 

        }).rejects.toBeInstanceOf(Error)

    })

})