import { DataSource } from "typeorm"
import { ICategoriesGateway } from "../../../../communication/gateways/ICategoriesGateway"
import { CategoryEntity } from "../../../../infra/datasource/typeorm/entities/CategoryEntity"
import { CategoriesRepositoryPostgres } from "../../../../infra/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { OutputFindCategoryDTO } from "../../../dtos/categories/IFindCategoryDTO"

class FindByIdCategoryUseCase {

    private categoriesRepository: ICategoriesGateway

    constructor(
        private dataSource: DataSource        
    ){
        this.categoriesRepository = new CategoriesRepositoryPostgres(this.dataSource.getRepository(CategoryEntity))
    }

    async execute(id: number): Promise<OutputFindCategoryDTO> {
        const category = await this.categoriesRepository.findById(id)

        if (!category) {
            throw new Error(`Category ${id} not found`)
        }
        return { 
            id: category.id,
            name: category.name,
            description: category.description

        }
    }
}

export { FindByIdCategoryUseCase }