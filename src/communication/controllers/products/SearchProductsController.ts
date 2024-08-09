import { FindByCodeProductUseCase } from "../../../application/useCases/products/findByCodeProduct/FindByCodeProductUseCase";
import { OutputFindProductDTO } from "../../../application/dtos/products/IFindProductDTO";
import { FindByNameProductUseCase } from "../../../application/useCases/products/findByNameProduct/FindByNameProductUseCase";
import { FindProductByCategoryNameUseCase } from "../../../application/useCases/products/findProductByCategoryName/FindProductByCategoryNameUseCase";

class SearchProductsController {

    constructor(
        private findByNameProductUseCase: FindByNameProductUseCase,
        private findProductByCategoryNameUseCase: FindProductByCategoryNameUseCase,
        private findByCodeProductUseCase: FindByCodeProductUseCase
    ){}

    async handler (name : string, categoryName: string, code: string): Promise<OutputFindProductDTO[]>{
        
        if(!name && !categoryName && !code){
            throw Error('Missing parameters: code, name OR categoryName')
        }
        
        let products = [];
        
        if(name){
            products = await this.findByNameProductUseCase.execute( name.toString())
        }
        else if (categoryName){
            products = await this.findProductByCategoryNameUseCase.execute( categoryName.toString())
        }
        else if (code){            
            const product = await this.findByCodeProductUseCase.execute( code.toString())            
            products.push(product)
        }
    
        return products
    }
}

export { SearchProductsController }