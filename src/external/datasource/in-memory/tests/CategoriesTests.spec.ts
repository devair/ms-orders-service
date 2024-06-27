import { CategoriesRepositoryInMemory } from "../CategoriesRepositoryInMemory"
import { ICategoriesGateway } from "../../../../communication/gateways/ICategoriesGateway"

let categoriesRepository : ICategoriesGateway

describe('Category testes', ()=>{

    beforeEach(()=>{
        categoriesRepository = new CategoriesRepositoryInMemory()
    })

    it('Should be able to create a new category', async()=>{
        
        const category = await categoriesRepository.create( {name: 'Bebida', description: 'Bebidas'})

        expect(category).toHaveProperty('id')
    })

    it('Should be able to list categories', async()=>{
        
        await categoriesRepository.create( {name: 'Bebida', description: 'Bebidas'})
        
        const categories = await categoriesRepository.list()
        
        expect(categories.length).toBeGreaterThanOrEqual(1)
    }) 

    it('Should be able to find by id', async ()=>{

        const category = await categoriesRepository.create( {name: 'Bebida', description: 'Bebidas'})

        const categoryFound = await categoriesRepository.findById(category.id)

        expect(categoryFound).not.toBeUndefined()

    })

    it('Should be able to find by name', async ()=>{

        const category = await categoriesRepository.create( {name: 'Bebida', description: 'Bebidas'})

        const categoryFound = await categoriesRepository.findByName(category.name)

        expect(categoryFound).not.toBeUndefined()

    })

})