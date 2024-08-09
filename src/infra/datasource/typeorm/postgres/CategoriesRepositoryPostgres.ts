import { Repository } from "typeorm"
import { ICategoriesGateway } from "../../../../communication/gateways/ICategoriesGateway"
import { Category } from "../../../../core/entities/Category"
import { InputCreateCategoryDTO } from "../../../../application/dtos/categories/ICreateCategoryDTO"
import { InputUpdateCategoryDTO } from "../../../../application/dtos/categories/IEditCategoryDTO"

class CategoriesRepositoryPostgres implements ICategoriesGateway{
   
    constructor(
        private readonly repository: Repository<Category>
    ){}

    async update({ id, name, description }: InputUpdateCategoryDTO): Promise<void> {              
        await this.repository.update( id, { name, description })        
    }
    
    async findById(id: number): Promise<Category> {
        const category = this.repository.findOne({ where: {id }})
        return category 
    }
    
    async create({ name, description }: InputCreateCategoryDTO ): Promise<Category> {
        const category = this.repository.create({
            name, description
        });

        const categoryCreated = await this.repository.save(category)

        return categoryCreated
    }
    
    async list(): Promise<Category[]> {
        const all = await this.repository.find()
        return all
    }

    async findByName(name: string): Promise<Category[]> {
        const categories = await this.repository
        .createQueryBuilder('category')
        .where('LOWER(name) LIKE :pattern', { pattern: `%${ name.toLowerCase() }%` })                                    
        .getMany()

        return categories
    }

}

export { CategoriesRepositoryPostgres }