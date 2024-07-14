import { FindByCodeProductUseCase } from "../../../core/useCases/products/findByCodeProduct/FindByCodeProductUseCase";
import { OutputFindProductDTO } from "../../../core/useCases/products/findByIdProduct/IFindProductDTO";
import { FindByNameProductUseCase } from "../../../core/useCases/products/findByNameProduct/FindByNameProductUseCase";
import { FindProductByCategoryNameUseCase } from "../../../core/useCases/products/findProductByCategoryName/FindProductByCategoryNameUseCase";
import { IProductsGateway } from "../../gateways/IProductsGateway";

class SearchProductsController {

    constructor(private productsRepository: IProductsGateway){}

    async handler (name : string, categoryName: string, code: string): Promise<OutputFindProductDTO[]>{
        
        if(!name && !categoryName && !code){
            throw Error('Missing parameters: code, name OR categoryName')
        }

        const findByNameProductUseCase = new FindByNameProductUseCase(this.productsRepository)
        const findProductByCategoryNameUseCase = new FindProductByCategoryNameUseCase(this.productsRepository)
        const findByCodeProductUseCase = new FindByCodeProductUseCase(this.productsRepository) 
        
        let products = [];
        
        if(name){
            products = await findByNameProductUseCase.execute( name.toString())
        }
        else if (categoryName){
            products = await findProductByCategoryNameUseCase.execute( categoryName.toString())
        }
        else if (code){            
            const product = await findByCodeProductUseCase.execute( code.toString())            
            products.push(product)
        }
    
        return products
    }
}

export { SearchProductsController }