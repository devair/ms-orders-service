import { InputCreateCategoryDTO } from "../../application/dtos/categories/ICreateCategoryDTO"
import { InputUpdateCategoryDTO } from "../../application/dtos/categories/IEditCategoryDTO"
import { Category } from "../../core/entities/Category"

interface ICategoriesGateway{

    create( { name, description }: InputCreateCategoryDTO ): Promise<Category>
    
    list(): Promise<Category[]>

    findByName(name: string): Promise<Category[]>
    
    findById(id: number): Promise<Category>

    update({ id, name, description }: InputUpdateCategoryDTO): Promise<void>
}

export { ICategoriesGateway }