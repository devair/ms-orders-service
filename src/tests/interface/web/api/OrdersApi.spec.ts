import request from "supertest"
import { app } from "../../../../application/index"
import { settings } from 'pactum'

let orderCreated: any
let categoryCreated: any
let productCreated: any

describe("OrdersApi", () => {

  beforeAll(async () => {
    settings.setLogLevel('ERROR')    
  }, 30000)

  it("should be able to create a new category", async () => {
    const response = await request(await app)
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
    const response = await request(await app)
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

  it("should be able to create a new order", async () => {
    const response = await request(await app)
      .post("/api/v1/orders")
      .send({
        orderItems: [
          {
            product: {
              code: productCreated.code
            },
            quantity: 2,
            unitPrice: 10
          }
        ]
      })
        
    orderCreated = response.body

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")        
  })

  it("should not be able to create a new order", async () => {
    const response = await request(await app)
      .post("/api/v1/orders")
      .send({
        name: 'Bebidas'
      })    
    
      expect(response.status).toBe(400)    
  })

  
  it("Should be able to find a order by id", async () => {
    const response = await request(await app)
      .get(`/api/v1/orders/${orderCreated.id}`)          

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("id")        
  })

  it("Should not be able to find a order by id", async () => {
    const response = await request(await app)
      .get(`/api/v1/orders/999999`)          

    expect(response.status).toBe(400)    
  })

  it("should be able to update a order", async () => {
    const response = await request(await app)
      .patch(`/api/v1/orders/${orderCreated.id}/status`)
      .send({
        status: 'Pronto'        
      })    
    expect(response.status).toBe(200)
  })

  it("should not be able to update a order", async () => {
    const response = await request(await app)
      .patch(`/api/v1/orders/${orderCreated.id}/status`)
      .send({
                
      })    
    expect(response.status).toBe(400)
  })

  it("Should be able to list all orders", async () => {
    const response = await request(await app)
      .get(`/api/v1/orders`)      
    
    expect(response.status).toBe(200)    
    expect(response.body).toBeInstanceOf(Array)
  })

})