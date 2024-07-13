import { ICategoriesGateway } from "../../../../../communication/gateways/ICategoriesGateway"
import { CategoriesRepositoryPostgres } from "../../../../../external/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { Category } from "../../../../entities/Category"
import { CreateCategoryUseCase } from "../CreateCategoryUseCase"

let createCategoryeUse : CreateCategoryUseCase
let category: Category
let categoriesRepository: ICategoriesGateway

describe('Categories Service tests', ()=>{

    beforeEach(()=>{
        categoriesRepository = new CategoriesRepositoryPostgres()
        createCategoryeUse = new CreateCategoryUseCase(categoriesRepository)             
    })

    it('Should be able to create a new category', async()=>{
        const categoryCreated = await createCategoryeUse.execute( {name: 'Bebida', description: 'Bebidas'})

        category = new Category()
        
        Object.assign(category, categoryCreated)

        expect(category).toHaveProperty('id')
    })    

    it('Should not be able to duplicated a category', async ()=>{

        expect(async ()=>{    
            
           await createCategoryeUse.execute( {name: 'Bebida', description: 'Bebidas'} ) 

        }).rejects.toBeInstanceOf(Error)

    })

})