import { DataSource } from "typeorm"
import { ICategoriesGateway } from "../../../communication/gateways/ICategoriesGateway"
import { CategoryEntity } from "../../../infra/datasource/typeorm/entities/CategoryEntity"
import { CategoriesRepositoryPostgres } from "../../../infra/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { OutputFindCategoryDTO } from "../../dtos/categories/IFindCategoryDTO"

class ListCategoriesUseCase {

    private categoriesRepository: ICategoriesGateway

    constructor(
        private dataSource: DataSource        
    ){
        this.categoriesRepository = new CategoriesRepositoryPostgres(this.dataSource.getRepository(CategoryEntity))
    }

    async execute(): Promise<OutputFindCategoryDTO[]> {

        const categories = await this.categoriesRepository.list()

        const output = categories.map((elem) => ({
            id: elem.id,
            name: elem.name,        
            description: elem.description
        }))

        return output
    }
}
export { ListCategoriesUseCase }