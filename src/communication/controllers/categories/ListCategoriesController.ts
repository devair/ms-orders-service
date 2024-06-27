import { OutputFindCategoryDTO } from "../../../core/useCases/categories/findByIdCategory/IFindCategoryDTO";
import { ListCategoriesUseCase } from "../../../core/useCases/categories/listCategories/ListCategoriesUseCase";
import { ICategoriesGateway } from "../../gateways/ICategoriesGateway";

class ListCategoriesController {
    
    constructor(private categoriesRepository: ICategoriesGateway){}

    async handler(): Promise<OutputFindCategoryDTO[]> {

        const listCategoriesUseCase = new ListCategoriesUseCase(this.categoriesRepository)        

        return await listCategoriesUseCase.execute();       

    }
}

export { ListCategoriesController }