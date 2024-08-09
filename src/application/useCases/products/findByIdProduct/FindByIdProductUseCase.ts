import { IProductsGateway } from "../../../../communication/gateways/IProductsGateway"
import { OutputFindProductDTO } from "./IFindProductDTO"

class FindByIdProductUseCase {

    constructor(private productsRepository: IProductsGateway){}

    async execute(id: number): Promise<OutputFindProductDTO> {
        const product = await this.productsRepository.findById(id)

        if (!product) {
            throw new Error(`Product ${id} not found`)
        }

        return {
            id: product.id,
            name: product.name,
            code: product.code,
            description: product.description,
            price: product.price,
            image: product.image,
            categoryId: product.categoryId                       
        }
    }
}

export { FindByIdProductUseCase }