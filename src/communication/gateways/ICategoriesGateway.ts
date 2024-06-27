import { Category } from "../../core/entities/Category"
import { InputCreateCategoryDTO } from "../../core/useCases/categories/createCategory/ICreateCategoryDTO"
import { InputUpdateCategoryDTO } from "../../core/useCases/categories/editCategory/IEditCategoryDTO"

interface ICategoriesGateway{

    create( { name, description }: InputCreateCategoryDTO ): Promise<Category>
    
    list(): Promise<Category[]>

    findByName(name: string): Promise<Category[]>
    
    findById(id: number): Promise<Category>

    update({ id, name, description }: InputUpdateCategoryDTO): Promise<void>
}

export { ICategoriesGateway }