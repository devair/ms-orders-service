import request from "supertest"
import { app } from "../../../../application/index"

let customerCreated: any
const cpfTest = '99887766554'
const nameTest = 'Customer'

describe("CustomersApi", () => {

  it("should be able to create a new customer", async () => {
    const response = await request( await app)
      .post("/api/v1/customers")
      .send({
        name: nameTest,
        cpf: cpfTest,
        phone: '554799999999',
        email: 'test@example.com'
      })
        
    customerCreated = response.body

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")        
  })

  it("should not be able to create a new customer", async () => {
    const response = await request(await app)
      .post("/api/v1/customers")
      .send({
        name: 'Customer'
      })    
    
      expect(response.status).toBe(400)    
  })

  
  it("Should be able to find a customer by id", async () => {
    const response = await request(await app)
      .get(`/api/v1/customers/${customerCreated.id}`)          

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("id")        
  })

  it("Should not be able to find a customer by id", async () => {
    const response = await request(await app)
      .get(`/api/v1/customers/999999`)          

    expect(response.status).toBe(400)    
  })

  
  it("Should be able to search a customer by cpf", async () => {
    const response = await request(await app)
      .get(`/api/v1/customers/search`)
      .query({'cpf': cpfTest})
    
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)   
  })

  it("Should be able to search a customer by name", async () => {
    const response = await request(await app)
      .get(`/api/v1/customers/search`)
      .query({'name': nameTest})
    
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)   
  })

  it("Should not be able to search a customer", async () => {
    const response = await request(await app)
      .get(`/api/v1/customers/search`)      
    
    expect(response.status).toBe(400)    
  })

  it("Should be able to list all customers", async () => {
    const response = await request(await app)
      .get(`/api/v1/customers`)      
    
    expect(response.status).toBe(200)    
    expect(response.body).toBeInstanceOf(Array)
  })

})