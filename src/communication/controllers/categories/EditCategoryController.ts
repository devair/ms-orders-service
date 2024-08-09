import { EditCategoryUseCase } from "../../../application/useCases/categories/editCategory/EditCategoryUseCase";
import { InputUpdateCategoryDTO } from "../../../application/dtos/categories/IEditCategoryDTO";
import { ICategoriesGateway } from "../../gateways/ICategoriesGateway"

class EditCategoryController {
    
    constructor(private categoriesRepository: ICategoriesGateway){}

    async handler({ id, name, description }: InputUpdateCategoryDTO): Promise<void> {

        const editCategoryUseCase = new EditCategoryUseCase(this.categoriesRepository)        

        await editCategoryUseCase.execute({ id, name, description});       
    }
}

export { EditCategoryController }