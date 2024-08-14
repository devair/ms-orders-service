import { DataSource } from "typeorm"
import { ICategoriesGateway } from "../../../communication/gateways/ICategoriesGateway"
import { CategoryEntity } from "../../../infra/datasource/typeorm/entities/CategoryEntity"
import { CategoriesRepositoryPostgres } from "../../../infra/datasource/typeorm/postgres/CategoriesRepositoryPostgres"
import { InputUpdateCategoryDTO } from "../../dtos/categories/IEditCategoryDTO"

class EditCategoryUseCase {

    private categoriesRepository: ICategoriesGateway

    constructor(
        private dataSource: DataSource        
    ){
        this.categoriesRepository = new CategoriesRepositoryPostgres(this.dataSource.getRepository(CategoryEntity))
    }


    async execute({ id, name, description }: InputUpdateCategoryDTO): Promise<void> {

        const categoryFound = await this.categoriesRepository.findById(id)

        if (!categoryFound) {
            throw new Error(`Category ${id} not found`)
        }

        if (name) {
            const categories = await this.categoriesRepository.findByName(name)

            const categorySameName = categories.find(({ name }) => name)

            if (categorySameName && categorySameName.id != id) {
                throw new Error(`Category ${name} already exists with other id ${categorySameName.id} `)
            }
        }

        await this.categoriesRepository.update({ id, name, description });

    }
}

export { EditCategoryUseCase }