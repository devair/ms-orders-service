import { OutputFindCategoryDTO } from "../../../application/dtos/categories/IFindCategoryDTO";
import { FindByNameCategoryUseCase } from "../../../application/useCases/categories/findByNameCategory/FindByNameCategoryUseCase";
import { ICategoriesGateway } from "../../gateways/ICategoriesGateway"

class FindByNameCategoryController {
    
    constructor(private categoriesRepository: ICategoriesGateway){}

    async handler(name: string): Promise<OutputFindCategoryDTO[]> {

        const findByNameCategoryUseCase = new FindByNameCategoryUseCase(this.categoriesRepository)        

        return await findByNameCategoryUseCase.execute(name);       

    }
}

export { FindByNameCategoryController }