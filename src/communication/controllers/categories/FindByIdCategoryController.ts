import { FindByIdCategoryUseCase } from "../../../core/useCases/categories/findByIdCategory/FindByIdCategoryUseCase";
import { OutputFindCategoryDTO } from "../../../core/useCases/categories/findByIdCategory/IFindCategoryDTO";
import { ICategoriesGateway } from "../../gateways/ICategoriesGateway";

class FindByIdCategoryController {
    
    constructor(private categoriesRepository: ICategoriesGateway){}

    async handler(id: number): Promise<OutputFindCategoryDTO> {

        const findByIdCategoryUseCase = new FindByIdCategoryUseCase(this.categoriesRepository)        

        return await findByIdCategoryUseCase.execute(id);       

    }
}

export { FindByIdCategoryController }