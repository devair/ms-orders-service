import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { AppDataSource } from '../external/datasource/typeorm'

let mongoServer: MongoMemoryServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  process.env.MONGODB_URI = uri

  await mongoose.connect(uri)
  await AppDataSource.setOptions({ url: uri }).initialize()

}, 60000)

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await AppDataSource.destroy()
  await mongoServer.stop()  
}, 30000)

