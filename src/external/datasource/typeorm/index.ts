import "reflect-metadata"
import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'

dotenv.config()

const dbname = process.env.DB_DATABASE //|| 'pedidos_db'
const dbuser = process.env.DB_USER //|| 'docker'
const dbpassword = process.env.DB_PASS //|| 'docker'
const dbhost = process.env.DB_HOST // || 'postgres-db'
const dbport = process.env.DB_PORT // || 'postgres-db'
    
const AppDataSource = new DataSource({
    type: "postgres",
    host: dbhost,
    port: parseInt(dbport),
    username: dbuser,
    password: dbpassword,
    database: dbname,
    synchronize: true,
    logging: true,
    entities: ["./dist/external/datasource/typeorm/entities/*.js"],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export { AppDataSource } 