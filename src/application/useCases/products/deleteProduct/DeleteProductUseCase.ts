import { IProductsGateway } from "../../../../communication/gateways/IProductsGateway"

class DeleteProductUseCase {

    constructor(private productsRepository: IProductsGateway){}

    async execute(id: number): Promise<boolean> {
        return await this.productsRepository.delete(id)
    }
}

export { DeleteProductUseCase }