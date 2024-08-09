import { ICategoriesGateway } from "../../../../communication/gateways/ICategoriesGateway"
import { IProductsGateway } from "../../../../communication/gateways/IProductsGateway"
import { CreateCategoryUseCase } from "../../../../application/useCases/categories/createCategory/CreateCategoryUseCase"
import { CreateProductUseCase } from "../../../../application/useCases/products/createProduct/CreateProductUseCase"
import { DeleteProductUseCase } from "../../../../application/useCases/products/deleteProduct/DeleteProductUseCase"
import { AppDataSource } from "../../../../infra/datasource/typeorm"

let createCategoryeUse : CreateCategoryUseCase
let createProducteUse : CreateProductUseCase
let deleteProductUseCase: DeleteProductUseCase

describe('Products Use Case tests', ()=>{

    beforeAll(()=>{                       
        createCategoryeUse = new CreateCategoryUseCase(AppDataSource)                     
        createProducteUse = new CreateProductUseCase(AppDataSource)
        deleteProductUseCase = new DeleteProductUseCase(AppDataSource)
    })

    it('Should be able to delete a product', async () => {

        const category = await createCategoryeUse.execute({ name: 'Bebida', description: 'Bebida gelada' })
        
        const product = await createProducteUse.execute({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        })
        
        expect(category).toHaveProperty('id')

        const result = await deleteProductUseCase.execute(product.id)

        expect(result).toBeTruthy()

    })
})