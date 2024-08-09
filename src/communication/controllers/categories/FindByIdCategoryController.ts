import { FindByIdCategoryUseCase } from "../../../application/useCases/categories/findByIdCategory/FindByIdCategoryUseCase";
import { OutputFindCategoryDTO } from "../../../application/dtos/categories/IFindCategoryDTO";
import { ICategoriesGateway } from "../../gateways/ICategoriesGateway"

class FindByIdCategoryController {
    
    constructor(private categoriesRepository: ICategoriesGateway){}

    async handler(id: number): Promise<OutputFindCategoryDTO> {

        const findByIdCategoryUseCase = new FindByIdCategoryUseCase(this.categoriesRepository)        

        return await findByIdCategoryUseCase.execute(id);       

    }
}

export { FindByIdCategoryController }