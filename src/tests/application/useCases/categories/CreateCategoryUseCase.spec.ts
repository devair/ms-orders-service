import { CategoriesRepositoryPostgres } from "../../../../infra/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { ICategoriesGateway } from "../../../../communication/gateways/ICategoriesGateway"
import { Category } from "../../../../core/entities/Category"
import { CreateCategoryUseCase } from "../../../../application/useCases/categories/CreateCategoryUseCase"
import { AppDataSource } from "../../../../infra/datasource/typeorm"

let createCategoryeUse : CreateCategoryUseCase
let category: Category
let categoriesRepository: ICategoriesGateway

describe('Categories Service tests', ()=>{

    beforeEach(()=>{                
        createCategoryeUse = new CreateCategoryUseCase(AppDataSource)             
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