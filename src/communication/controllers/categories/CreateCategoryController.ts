import { CreateCategoryUseCase } from "../../../application/useCases/categories/CreateCategoryUseCase";
import { InputCreateCategoryDTO, OutputCreateCategoryDTO } from "../../../application/dtos/categories/ICreateCategoryDTO";

class CreateCategoryController {
    
    constructor(private categoryUseCase: CreateCategoryUseCase){}

    async handler(createCategory: InputCreateCategoryDTO): Promise<OutputCreateCategoryDTO> {

        return await this.categoryUseCase.execute(createCategory);            
    }
}

export { CreateCategoryController }