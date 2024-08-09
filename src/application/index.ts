import "reflect-metadata"
import * as dotenv from 'dotenv'
import { createApp } from "../config/app"

dotenv.config()
const app = createApp()

export { app }