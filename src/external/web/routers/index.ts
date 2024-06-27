import { Router } from "express";
import { categoriesRouter } from "./categories.router";
import { productsRouter } from "./products.router";
import { customersRouter } from "./customers.router";
import { ordersRouter } from "./orders.router";

const router = Router()

router.use('/categories', categoriesRouter)
router.use('/products', productsRouter)
router.use('/customers', customersRouter)
router.use('/orders', ordersRouter)


export { router }
