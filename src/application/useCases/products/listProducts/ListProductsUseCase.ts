import { IProductsGateway } from "../../../../communication/gateways/IProductsGateway"
import { OutputFindProductDTO } from "../../../dtos/products/IFindProductDTO"

class ListProductsUseCase {

    constructor(private productsRepository: IProductsGateway){}

    async execute(): Promise<OutputFindProductDTO[]> {

        const products = await this.productsRepository.list()

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
export { ListProductsUseCase }