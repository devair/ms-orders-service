import { CreateCategoryUseCase } from "../../../../application/useCases/categories/createCategory/CreateCategoryUseCase"
import { FindByNameCategoryUseCase } from "../../../../application/useCases/categories/findByNameCategory/FindByNameCategoryUseCase"
import { AppDataSource } from "../../../../infra/datasource/typeorm"

let createCategoryeUse : CreateCategoryUseCase
let findByNameCategoryUseCase : FindByNameCategoryUseCase

describe('Categories Service tests', ()=>{

    beforeEach(()=>{
        createCategoryeUse = new CreateCategoryUseCase(AppDataSource) 
        findByNameCategoryUseCase = new FindByNameCategoryUseCase(AppDataSource)                    
    })

    it('Should be able to find a category by name', async()=>{
        const category = await createCategoryeUse.execute( {name: 'Bebida', description: 'Bebidas'})

        expect(category).toHaveProperty('id')
        
        const categories = await findByNameCategoryUseCase.execute('Bebida')
        
        expect(categories.length).toBe(1)

    })    

    it('Should not be able to find a category by name', async ()=>{

        const categories = await findByNameCategoryUseCase.execute('Nao exite')
        
        expect(categories.length).toBe(0)

    })

})