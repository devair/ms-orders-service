import request from "supertest"
import { app } from "../../../../index"
import { settings } from 'pactum'

let categoryCreated: any
let productCreated: any

describe("ProductsApi", () => {

  beforeAll(async () => {
    settings.setLogLevel('ERROR')    
  }, 60000)


  it("should be able to create a new category", async () => {
    const response = await request(app)
      .post("/api/v1/categories")
      .send({
        name: 'Bebidas',
        description: 'Bebidas'
      })
        
    categoryCreated = response.body

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")        
  })


  it("should be able to create a new product", async () => {
    const response = await request(app)
      .post("/api/v1/products")
      .send({
        code: 'prod1',
        name: 'Produto 1',
        description: 'Produto 1', 
        productId: categoryCreated.id,
        price: 10, 
        image: ''
      })
        
    productCreated = response.body

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")        
  })

  it("should not be able to create a new product", async () => {
    const response = await request(app)
      .post("/api/v1/products")
      .send({        
        name: 'Produto 1',        
      })            
    expect(response.status).toBe(400)    
  })

  
  it("Should be able to find a product by id", async () => {
    const response = await request(app)
      .get(`/api/v1/products/${productCreated.id}`)          

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("id")        
  })

  it("Should not be able to find a product by id", async () => {
    const response = await request(app)
      .get(`/api/v1/products/999999`)          

    expect(response.status).toBe(400)    
  })

  it("should be able to update a product", async () => {
    const response = await request(app)
      .put(`/api/v1/products/${productCreated.id}`)
      .send({
        name: 'Suco',
        description: 'Sucos'
      })
    
    expect(response.status).toBe(204)

  })

  it("should not be able to update a product", async () => {
    const response = await request(app)
      .put(`/api/v1/products/9999999`)
      .send({
        name: 'Suco',
        description: 'Sucos'
      })
    
    expect(response.status).toBe(400)

  })

  it("Should be able to search a product by name", async () => {
    const response = await request(app)
      .get(`/api/v1/products/search`)
      .query({'name': 'Suco'})
    
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)   
  })

  it("Should be able to search a product by code", async () => {
    const response = await request(app)
      .get(`/api/v1/products/search`)
      .query({'code': productCreated.code})
    
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)   
  })

  it("Should be able to search a category by name", async () => {
    const response = await request(app)
      .get(`/api/v1/products/search`)
      .query({'categoryName': categoryCreated.name})
    
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)   
  })


  it("Should not be able to search a product by name", async () => {
    const response = await request(app)
      .get(`/api/v1/products/search`)      
    
    expect(response.status).toBe(400)    
  })

  it("Should be able to list all products", async () => {
    const response = await request(app)
      .get(`/api/v1/products`)      
    
    expect(response.status).toBe(200)    
    expect(response.body).toBeInstanceOf(Array)
  })

  it("Should be able to delete a products", async () => {
    const response = await request(app)
      .delete(`/api/v1/products/${productCreated.id}`)          
    expect(response.status).toBe(204)        
  })

})