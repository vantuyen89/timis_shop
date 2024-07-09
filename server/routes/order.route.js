import { Router } from "express";
import { createOrder, getOrderById, getOrderByUserId } from "../controllers/order.controller.js";

const routerOrder = Router()
routerOrder.post('/order',createOrder)
routerOrder.get('/order/:userId', getOrderByUserId)
routerOrder.get('/order/:userId/:orderId', getOrderById)

export default routerOrder