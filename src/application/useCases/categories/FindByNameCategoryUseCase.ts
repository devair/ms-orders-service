import { DataSource } from "typeorm"
import { ICategoriesGateway } from "../../../communication/gateways/ICategoriesGateway";
import { CategoryEntity } from "../../../infra/datasource/typeorm/entities/CategoryEntity"
import { CategoriesRepositoryPostgres } from "../../../infra/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { OutputFindCategoryDTO } from "../../dtos/categories/IFindCategoryDTO";

class FindByNameCategoryUseCase {

    private categoriesRepository: ICategoriesGateway

    constructor(
        private dataSource: DataSource        
    ){
        this.categoriesRepository = new CategoriesRepositoryPostgres(this.dataSource.getRepository(CategoryEntity))
    }

    async execute(name: string): Promise<OutputFindCategoryDTO[]> {
        
        if (!name){
            throw Error('Missing parameter: name')
        }

        const categories = await this.categoriesRepository.findByName(name)

        const output = categories.map((elem) => ({
            id: elem.id,
            name: elem.name,        
            description: elem.description
        }))
        
        return output
    }
}

export { FindByNameCategoryUseCase }