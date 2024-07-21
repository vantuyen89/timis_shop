import { Router } from "express";
import { createOrder, getOrderById, getOrderByUserId } from "../controllers/order.controller.js";
import authentication from "../middlewares/authentication.js";

const routerOrder = Router()
routerOrder.post('/',authentication,createOrder)
routerOrder.get('/:userId', authentication, getOrderByUserId)
routerOrder.get('/:userId/:orderId', authentication, getOrderById)

export default routerOrder