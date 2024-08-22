import express from "express"
import "express-async-errors"
import * as dotenv from 'dotenv'
import amqplib from "amqplib"
import { AppDataSource } from "../infra/datasource/typeorm"
import { router } from '../interface/web/routers'
import swaggerUi from 'swagger-ui-express'
import * as swaggerFile from '../openapi.json'
import { UpdateOrderStatusUseCase } from "../application/useCases/orders/UpdateOrderStatusUseCase"
import RabbitMQOrderQueueAdapterOUT from "../infra/messaging/RabbitMQOrderQueueAdapterOUT"
import { OrderCreatedQueueAdapterIN } from "../infra/messaging/OrderUpdateQueueAdapterIN"
import helmet from 'helmet'
import { QueueNames } from "../core/messaging/QueueNames"
import sanitizeJsonBody from "./sanitizeJsonBody"

dotenv.config()
const rabbitMqUrl = process.env.RABBITMQ_URL ? process.env.RABBITMQ_URL : ''
const port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3333

export const createApp = async () => {
    const app = express()
    app.disable("x-powered-by")
    app.use(express.json())
   
    // Middleware XSS Clean
    app.use(sanitizeJsonBody); // Adiciona o middleware de sanitização
    

    // Define o cabeçalho X-Content-Type-Options para 'nosniff'
    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff')
        next()
    })

    // Configura o Content-Security-Policy usando helmet    
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://trusted.cdn.com"],
            styleSrc: ["'self'", "https://trusted.cdn.com"],
            imgSrc: ["'self'", "https://images.com"],
            connectSrc: ["'self'", "https://api.trusted.com"],
            fontSrc: ["'self'", "https://fonts.googleapis.com"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        }
    }))


    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

    app.get('/health', (request, response) => {
        return response.status(200).send('Ok')
    })


    // Configura Persistencia
    if (process.env.NODE_ENV !== 'test') {
        AppDataSource.initialize().then(async (datasource) => {


            const rabbitMQConnection = await amqplib.connect(rabbitMqUrl)

            // Configura os publicadores
            const queuesOut: string[] = [QueueNames.ORDER_CREATED, QueueNames.ORDER_TO_PRODUCE,
            QueueNames.ORDER_DONE, QueueNames.ORDER_FINISHED,
            QueueNames.PAYMENT_REJECTED, QueueNames.CUSTOMER_NOTIFICATION]

            const orderPublisher = new RabbitMQOrderQueueAdapterOUT(rabbitMQConnection, queuesOut)
            orderPublisher.connect()

            const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(datasource, orderPublisher)
            const updateOrderStatusConsume = new OrderCreatedQueueAdapterIN(rabbitMqUrl, updateOrderStatusUseCase)
            updateOrderStatusConsume.consume(QueueNames.ORDER_PAID)

            const updateOrderDoneUseCase = new UpdateOrderStatusUseCase(datasource, orderPublisher)
            const updateOrderDoneConsume = new OrderCreatedQueueAdapterIN(rabbitMqUrl, updateOrderDoneUseCase)
            updateOrderDoneConsume.consume(QueueNames.ORDER_DONE)

            const updateOrderRejectUseCase = new UpdateOrderStatusUseCase(datasource, orderPublisher)
            const updateOrderRejectConsume = new OrderCreatedQueueAdapterIN(rabbitMqUrl, updateOrderRejectUseCase)
            updateOrderRejectConsume.consume(QueueNames.PAYMENT_REJECTED)

            app.use('/api/v1', router(datasource, orderPublisher))

            app.listen(port,'0.0.0.0', () => {
                console.log(`Orders service listening  on port ${port}`)
            })
        }).catch(error => console.log(error))
    }
    else {
        app.use('/api/v1', router(AppDataSource, null))
    }

    return app
}