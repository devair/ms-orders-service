import { EditProductUseCase } from "../../../core/useCases/products/editProduct/EditProductUseCase";
import { InputUpdateProductDTO } from "../../../core/useCases/products/editProduct/IEditProductDTO";
import { ICategoriesGateway } from "../../gateways/ICategoriesGateway";
import { IProductsGateway } from "../../gateways/IProductsGateway";

class EditProductController {
    
    constructor(private productsRepository: IProductsGateway,
        private categoriesRepository: ICategoriesGateway){}

    async handler({id, code, name, description, categoryId, price, image }: InputUpdateProductDTO): Promise<void> {

        const editProductUseCase = new EditProductUseCase(this.productsRepository, this.categoriesRepository)        

        await editProductUseCase.execute({ id, code, name, description, categoryId, price, image});       
    }
}

export { EditProductController }