import 'reflect-metadata'
import express from 'express'
import "express-async-errors"
import * as dotenv from 'dotenv'
import { router  } from './adapters/web/routers'
import { AppDataSource } from './adapters/datasource/typeorm'
import swaggerUi from 'swagger-ui-express'
import * as swaggerFile from './openapi.json'

dotenv.config()

const app = express()
app.disable("x-powered-by")

const port = process.env.APP_PORT || 3333

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/health', (request, response) => {
    return response.status(200).send('Ok');
})

app.use('/api/v1', router)

if (process.env.NODE_ENV !== 'test') {
    AppDataSource.initialize().then(() => {
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    }).catch(error => console.log(error));
}

export { app }