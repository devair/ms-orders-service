import { CreateCategoryUseCase } from "../../../core/useCases/categories/createCategory/CreateCategoryUseCase";
import { InputCreateCategoryDTO, OutputCreateCategoryDTO } from "../../../core/useCases/categories/createCategory/ICreateCategoryDTO";
import { ICategoriesGateway } from "../../gateways/ICategoriesGateway";

class CreateCategoryController {
    
    constructor(private categoriesRepository: ICategoriesGateway){}

    async handler(createCategory: InputCreateCategoryDTO): Promise<OutputCreateCategoryDTO> {

        const categoryUseCase = new CreateCategoryUseCase(this.categoriesRepository)
        
        return await categoryUseCase.execute(createCategory);            
    }
}

export { CreateCategoryController }