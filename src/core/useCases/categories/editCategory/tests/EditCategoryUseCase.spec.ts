import { CategoriesRepositoryPostgres } from "../../../../../external/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { CreateCategoryUseCase } from "../../createCategory/CreateCategoryUseCase"
import { EditCategoryUseCase } from "../EditCategoryUseCase"


let createCategoryUseCase: CreateCategoryUseCase
let updateCategoryUseCase: EditCategoryUseCase

describe('Categories Service tests', ()=>{

    beforeEach(()=>{
        const categoriesRepository = new CategoriesRepositoryPostgres()
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
        updateCategoryUseCase = new EditCategoryUseCase(categoriesRepository)

    })

    it('Should be able to update a category', async ()=>{

        const categoryBebida = await createCategoryUseCase.execute( {name: 'Bebida', description: 'Bebidas'} ) 
        
        await updateCategoryUseCase.execute( {id: categoryBebida.id, name: 'Descriptin updated' } )
                
    })

    it('Should not be able to update a category', async ()=>{

        expect(async ()=>{    
            
           const categoryBebida = await createCategoryUseCase.execute( {name: 'Bebida', description: 'Bebidas'} ) 

           const categoryLanche = await createCategoryUseCase.execute( {name: 'Lanche', description: 'Lanche'} ) 

           await updateCategoryUseCase.execute({ id: categoryLanche.id, name: categoryBebida.name , description: categoryLanche.description })

        }).rejects.toBeInstanceOf(Error)

    })

    it('Should not be able to update a non-existent category', async ()=>{

        expect(async ()=>{    
                      
           await updateCategoryUseCase.execute({ id: 99, name: 'Non-existent' , description: 'Non-existent' })

        }).rejects.toBeInstanceOf(Error)

    })

})