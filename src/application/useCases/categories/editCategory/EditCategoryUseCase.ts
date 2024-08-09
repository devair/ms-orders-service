import { ICategoriesGateway } from "../../../../communication/gateways/ICategoriesGateway"
import { InputUpdateCategoryDTO } from "../../../dtos/categories/IEditCategoryDTO"

class EditCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesGateway) { }

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