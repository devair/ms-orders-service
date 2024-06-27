import { IProductsGateway } from "../../../../communication/gateways/IProductsGateway"
import { OutputFindProductDTO } from "../findByIdProduct/IFindProductDTO"

class FindProductByCategoryNameUseCase {

    constructor(private productsRepository: IProductsGateway){}

    async execute(name: string): Promise<OutputFindProductDTO[]> {
        const products = await this.productsRepository.findByCategory(name)
        
        const output = products.map((elem) => ({
            id: elem.id,
            name: elem.name,
            code: elem.code,
            description: elem.description,
            price: elem.price,
            image: elem.image           
        }))

        return output
    }
}

export { FindProductByCategoryNameUseCase }