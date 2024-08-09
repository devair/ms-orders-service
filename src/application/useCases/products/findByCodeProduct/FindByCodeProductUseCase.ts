import { IProductsGateway } from "../../../../communication/gateways/IProductsGateway"
import { OutputFindProductDTO } from "../../../dtos/products/IFindProductDTO"

class FindByCodeProductUseCase {

    constructor(private productsRepository: IProductsGateway){}

    async execute(code: string): Promise<OutputFindProductDTO> {

        const product = await this.productsRepository.findByCode(code)

        if(!product){
            throw new Error(`Product ${code} not found`)
        }

        return {
            id: product.id,
            name: product.name,
            code: product.code,
            description: product.description,
            categoryId: product.categoryId,
            price: product.price,
            image: product.image
        }
    }
}

export { FindByCodeProductUseCase }