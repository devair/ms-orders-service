import { CategoriesRepositoryPostgres } from "../../../../../adapters/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { CreateCategoryUseCase } from "../../createCategory/CreateCategoryUseCase"
import { FindByIdCategoryUseCase } from "../FindByIdCategoryUseCase"

let createCategoryeUse : CreateCategoryUseCase
let findByIdCategoryUseCase : FindByIdCategoryUseCase

describe('Categories Service tests', ()=>{

    beforeEach(()=>{
        const categoriesRepository = new CategoriesRepositoryPostgres()
        createCategoryeUse = new CreateCategoryUseCase(categoriesRepository) 
        findByIdCategoryUseCase = new FindByIdCategoryUseCase(categoriesRepository)                    
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