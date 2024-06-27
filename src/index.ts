import 'reflect-metadata'
import express from 'express'
import "express-async-errors"
import * as dotenv from 'dotenv'
import { router  } from './external/web/routers'

dotenv.config()

const app = express()
const port = process.env.APP_PORT || 3333;

app.use(express.json())

app.get('/health', (request, response) => {
    return response.status(200).send('Ok');
})

app.use('/api/v1', router)

app.listen(port, () => console.log(`Server is running at port ${port}`))