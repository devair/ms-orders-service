
import { ICategoriesGateway } from "../../../../communication/gateways/ICategoriesGateway";
import { InputCreateCategoryDTO, OutputCreateCategoryDTO } from "./ICreateCategoryDTO";

class CreateCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesGateway){}

    async execute({ name, description }: InputCreateCategoryDTO): Promise<OutputCreateCategoryDTO> {

        const categoryAlreadExists = await this.categoriesRepository.findByName(name)

        if (categoryAlreadExists.length > 0) {
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