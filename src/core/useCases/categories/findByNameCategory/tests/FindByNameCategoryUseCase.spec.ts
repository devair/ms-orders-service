import { CategoriesRepositoryPostgres } from "../../../../../adapters/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { CreateCategoryUseCase } from "../../createCategory/CreateCategoryUseCase"
import { FindByNameCategoryUseCase } from "../FindByNameCategoryUseCase"

let createCategoryeUse : CreateCategoryUseCase
let findByNameCategoryUseCase : FindByNameCategoryUseCase

describe('Categories Service tests', ()=>{

    beforeEach(()=>{
        const categoriesRepository = new CategoriesRepositoryPostgres()
        createCategoryeUse = new CreateCategoryUseCase(categoriesRepository) 
        findByNameCategoryUseCase = new FindByNameCategoryUseCase(categoriesRepository)                    
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