import { OutputFindCategoryDTO } from "../../../application/dtos/categories/IFindCategoryDTO";
import { FindByNameCategoryUseCase } from "../../../application/useCases/categories/findByNameCategory/FindByNameCategoryUseCase";

class FindByNameCategoryController {
    
    constructor(private findByNameCategoryUseCase: FindByNameCategoryUseCase){}

    async handler(name: string): Promise<OutputFindCategoryDTO[]> {

        return await this.findByNameCategoryUseCase.execute(name);       

    }
}

export { FindByNameCategoryController }