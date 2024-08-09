import request from "supertest"
import { app } from "../../../../application/index"
import { settings } from 'pactum'

let categoryCreated: any

describe("CategoriesApi", () => {

  beforeAll(async () => {
    settings.setLogLevel('ERROR')    
  }, 60000)


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

  it("should not be able to create a new category", async () => {
    const response = await request(await app)
      .post("/api/v1/categories")
      .send({
        name: 'Bebidas'
      })    
    
      expect(response.status).toBe(400)    
  })

  
  it("Should be able to find a category by id", async () => {
    const response = await request(await app)
      .get(`/api/v1/categories/${categoryCreated.id}`)          

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("id")        
  })

  it("Should not be able to find a category by id", async () => {
    const response = await request(await app)
      .get(`/api/v1/categories/999999`)          

    expect(response.status).toBe(400)    
  })

  it("should be able to update a category", async () => {
    const response = await request(await app)
      .put(`/api/v1/categories/${categoryCreated.id}`)
      .send({
        name: 'Suco',
        description: 'Sucos'
      })
    
    expect(response.status).toBe(204)

  })

  it("should not be able to update a category", async () => {
    const response = await request(await app)
      .put(`/api/v1/categories/9999999`)
      .send({
        name: 'Suco',
        description: 'Sucos'
      })
    
    expect(response.status).toBe(400)

  })

  it("Should be able to search a category by name", async () => {
    const response = await request(await app)
      .get(`/api/v1/categories/search`)
      .query({'name': 'Suco'})
    
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)   
  })

  it("Should not be able to search a category by name", async () => {
    const response = await request(await app)
      .get(`/api/v1/categories/search`)      
    
    expect(response.status).toBe(400)    
  })

  it("Should be able to list aall categories", async () => {
    const response = await request(await app)
      .get(`/api/v1/categories`)      
    
    expect(response.status).toBe(200)    
    expect(response.body).toBeInstanceOf(Array)
  })

})