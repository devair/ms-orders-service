import { OutputFindCategoryDTO } from "../../../core/useCases/categories/findByIdCategory/IFindCategoryDTO";
import { FindByNameCategoryUseCase } from "../../../core/useCases/categories/findByNameCategory/FindByNameCategoryUseCase";
import { ICategoriesGateway } from "../../gateways/ICategoriesGateway";

class FindByNameCategoryController {
    
    constructor(private categoriesRepository: ICategoriesGateway){}

    async handler(name: string): Promise<OutputFindCategoryDTO[]> {

        const findByNameCategoryUseCase = new FindByNameCategoryUseCase(this.categoriesRepository)        

        return await findByNameCategoryUseCase.execute(name);       

    }
}

export { FindByNameCategoryController }