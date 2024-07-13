import { ICategoriesGateway } from "../../../../../communication/gateways/ICategoriesGateway"
import { IProductsGateway } from "../../../../../communication/gateways/IProductsGateway"
import { Category } from "../../../../../core/entities/Category"
import { Product } from "../../../../../core/entities/Product"
import { CategoriesRepositoryPostgres } from "../CategoriesRepositoryPostgres"
import { ProductsRepositoryPostgres } from "../ProductsRepositoryPostgres"

let productsRepository : IProductsGateway
let categoriesRepository : ICategoriesGateway
let category : Category
let product: Product

describe('Product tests',()=>{
    beforeAll(()=>{
        categoriesRepository = new CategoriesRepositoryPostgres()
        productsRepository = new ProductsRepositoryPostgres()
    })

    it('Should be able to create a new product', async ()=>{

        category = await categoriesRepository.create( {name: 'Bebida', description: 'Bebidas'})

        product = await productsRepository.create({name:'produto1', code:'1', description:'teste', 
            price: 1 , categoryId: category.id , image:''})

        const productCreated = await productsRepository.findByCode(product.code)

        expect(productCreated).toHaveProperty('id')
        
        const productFoundById = await productsRepository.findById(productCreated.id)
       
        expect(productFoundById).toHaveProperty('id')

    })

    it('Should be able to find by code', async ()=>{
                
        const productCreated = await productsRepository.findByCode(product.code)

        expect(productCreated).not.toBeUndefined()

    })

    
    it('Should be able to find by name', async ()=>{
                
        const productCreated = await productsRepository.findByName(product.name)

        expect(productCreated).not.toBeUndefined()

    })

    it('Should be able to update', async ()=>{
        
        let produtUpdate = { ... product}

        produtUpdate.name='Produto update'

        produtUpdate = await productsRepository.update(produtUpdate)

        expect(produtUpdate.name).not.toBe(product.name)

    })

    it('Should be able to list products', async()=>{
        
        const products = await productsRepository.list()
               
        expect(products.length).toBeGreaterThan(0)
    }) 

    it('Should be able to create a new product', async ()=>{

        const product2 = await productsRepository.create({name:'produto2', code:'2', description:'teste 2', 
            price: 1 , categoryId: category.id , image:''})
        
        const deleted = await productsRepository.delete(product2.id)
       
        expect(deleted).toBeTruthy

    })

    
    
    it('Should be able to find by name', async ()=>{
                
        const productCreated = await productsRepository.findByCategory(category.name)

        expect(productCreated).not.toBeUndefined()

    })
})