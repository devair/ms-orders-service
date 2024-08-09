import { EditCategoryUseCase } from "../../../application/useCases/categories/editCategory/EditCategoryUseCase";
import { InputUpdateCategoryDTO } from "../../../application/dtos/categories/IEditCategoryDTO";

class EditCategoryController {
    
    constructor(private editCategoryUseCase: EditCategoryUseCase){}

    async handler({ id, name, description }: InputUpdateCategoryDTO): Promise<void> {

        await this.editCategoryUseCase.execute({ id, name, description});       
    }
}

export { EditCategoryController }