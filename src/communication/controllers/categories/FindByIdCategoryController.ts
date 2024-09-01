import { FindByIdCategoryUseCase } from "../../../application/useCases/categories/FindByIdCategoryUseCase";
import { OutputFindCategoryDTO } from "../../../application/dtos/categories/IFindCategoryDTO";

class FindByIdCategoryController {
    
    constructor(private findByIdCategoryUseCase: FindByIdCategoryUseCase){}

    async handler(id: number): Promise<OutputFindCategoryDTO> {          

        return await this.findByIdCategoryUseCase.execute(id);       

    }
}

export { FindByIdCategoryController }