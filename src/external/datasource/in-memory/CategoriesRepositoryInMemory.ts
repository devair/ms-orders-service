import { ICategoriesGateway } from "../../../communication/gateways/ICategoriesGateway"
import { Category } from "../../../core/entities/Category"
import { InputCreateCategoryDTO } from "../../../core/useCases/categories/createCategory/ICreateCategoryDTO"
import { InputUpdateCategoryDTO } from "../../../core/useCases/categories/editCategory/IEditCategoryDTO"
import { genId } from "./Util"

class CategoriesRepositoryInMemory implements ICategoriesGateway {

    private categories: Category[]

    constructor() {
        this.categories = []
    }

    async create({ name, description }: InputCreateCategoryDTO): Promise<Category> {
        const id = genId(this.categories)

        const category = new Category(id , name, description )

        this.categories.push(category)

        return category
    }

    async list(): Promise<Category[]> {
        return this.categories
    }

    async findByName(name: string): Promise<Category[]> {

        let categoriesFounded : Category[] = []

        this.categories.forEach((category) => {
            if(category.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())){
                categoriesFounded.push(category)
            }
        })            

        return categoriesFounded
    }

    async findById(id: number): Promise<Category> {
        const category = this.categories.find((category)=> category.id === id)
        
        return category

    }

    async update({id, name, description }: InputUpdateCategoryDTO): Promise<void> {        
        const category = await this.findById( id )
        
        Object.assign(category, { name, description })
        
    }
}

export { CategoriesRepositoryInMemory }