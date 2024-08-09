import express from "express"
import "express-async-errors"
import * as dotenv from 'dotenv'
import { AppDataSource } from "../adapters/datasource/typeorm"
import { router  } from '../adapters/web/routers'
import swaggerUi from 'swagger-ui-express'
import * as swaggerFile from '../openapi.json'

dotenv.config()
const rabbitMqUrl = process.env.RABBITMQ_URL ? process.env.RABBITMQ_URL : ''
const port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3333

export const createApp = async () => {
    const app = express()
    app.disable("x-powered-by")
    app.use(express.json())

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

    app.get('/health', (request, response) => {
        return response.status(200).send('Ok');
    })

    app.use('/api/v1', router)

    // Configura Persistencia
    if (process.env.NODE_ENV !== 'test') {
        AppDataSource.initialize().then(() => {
            app.listen(port, () => {
                console.log(`Orders service listening  on port ${port}`);
            });
        }).catch(error => console.log(error));
    }

    return app
}