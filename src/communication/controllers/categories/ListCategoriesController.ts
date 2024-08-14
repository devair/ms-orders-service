import { OutputFindCategoryDTO } from "../../../application/dtos/categories/IFindCategoryDTO";
import { ListCategoriesUseCase } from "../../../application/useCases/categories/ListCategoriesUseCase";

class ListCategoriesController {
    
    constructor(private listCategoriesUseCase: ListCategoriesUseCase){}

    async handler(): Promise<OutputFindCategoryDTO[]> {        
        return await this.listCategoriesUseCase.execute();       
    }
}

export { ListCategoriesController }