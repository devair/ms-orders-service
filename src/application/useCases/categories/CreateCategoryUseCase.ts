
import { DataSource } from "typeorm"
import { ICategoriesGateway } from "../../../communication/gateways/ICategoriesGateway";
import { CategoryEntity } from "../../../infra/datasource/typeorm/entities/CategoryEntity"
import { InputCreateCategoryDTO, OutputCreateCategoryDTO } from "../../dtos/categories/ICreateCategoryDTO";
import { CategoriesRepositoryPostgres } from "../../../infra/datasource/typeorm/postgres/CategoriesRepositoryPostgres"

class CreateCategoryUseCase {

    private categoriesRepository: ICategoriesGateway

    constructor(
        private dataSource: DataSource        
    ){
        this.categoriesRepository = new CategoriesRepositoryPostgres(this.dataSource.getRepository(CategoryEntity))
    }

    async execute({ name, description }: InputCreateCategoryDTO): Promise<OutputCreateCategoryDTO> {

        if(!name || !description){
            throw new Error(`Missing name or description field`);
        }

        name = name.trim()

        const categoryAlreadExists = await this.categoriesRepository.findOneByName(name)

        if (categoryAlreadExists) {
            throw new Error(`Category ${name} already exists`);
        }

        const category = await this.categoriesRepository.create({ name, description })

        return {
            id: category.id,
            name: category.name,
            description: category.description
        }
    }
}

export { CreateCategoryUseCase }