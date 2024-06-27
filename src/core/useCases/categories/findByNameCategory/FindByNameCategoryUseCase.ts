import { ICategoriesGateway } from "../../../../communication/gateways/ICategoriesGateway";
import { OutputFindCategoryDTO } from "../findByIdCategory/IFindCategoryDTO";

class FindByNameCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesGateway) { }

    async execute(name: string): Promise<OutputFindCategoryDTO[]> {
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