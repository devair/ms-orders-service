import { Router } from "express";
import { categoriesRouter } from "./categories.router";
import { productsRouter } from "./products.router";
import { customersRouter } from "./customers.router";
import { ordersRouter } from "./orders.router";
import { DataSource } from "typeorm"
import { OrdersApi } from "../api/OrdersApi"
import { ProductsApi } from "../api/ProductsApi"
import { CustomersApi } from "../api/CustomersApi"
import { CategoriesApi } from "../api/CategoriesApi"
import { IOrderQueueAdapterOUT } from "../../../core/messaging/IOrderQueueAdapterOUT"

export const router = (dataSource: DataSource, publisher: IOrderQueueAdapterOUT) => {
        
    const router = Router()

    const categoriesApi = new CategoriesApi(dataSource)
    router.use('/categories', categoriesRouter(categoriesApi))

    const productsApi = new ProductsApi(dataSource)
    router.use('/products', productsRouter(productsApi))
    
    const customersApi = new CustomersApi(dataSource)
    router.use('/customers', customersRouter(customersApi))

    const orderApi = new OrdersApi(dataSource, publisher)
    router.use('/orders', ordersRouter(orderApi))

    return router
}
