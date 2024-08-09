import { CreateCategoryUseCase } from "../../../../application/useCases/categories/createCategory/CreateCategoryUseCase"
import { FindByIdCategoryUseCase } from "../../../../application/useCases/categories/findByIdCategory/FindByIdCategoryUseCase"
import { AppDataSource } from "../../../../infra/datasource/typeorm"

let createCategoryeUse : CreateCategoryUseCase
let findByIdCategoryUseCase : FindByIdCategoryUseCase

describe('Categories Service tests', ()=>{

    beforeEach(()=>{        
        createCategoryeUse = new CreateCategoryUseCase(AppDataSource) 
        findByIdCategoryUseCase = new FindByIdCategoryUseCase(AppDataSource)                    
    })

    it('Should be able to find a category by id', async()=>{
        
        const category = await createCategoryeUse.execute( {name: 'Bebida', description: 'Bebidas'} ) 

        const categoryCreated = await findByIdCategoryUseCase.execute(category.id)

        expect(categoryCreated).toHaveProperty('id')
    })

    it('Should not be able to find a category by id', async ()=>{

        expect(async ()=>{               
            await findByIdCategoryUseCase.execute(99)         
        }).rejects.toBeInstanceOf(Error)

    })

})