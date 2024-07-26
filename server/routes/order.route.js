import { Router } from "express";
import { createOrder, getOrderAdminStatus, getOrderById, getOrderByUserId, getOrderStatus, updateOrderStatus } from "../controllers/order.controller.js";
import authentication from "../middlewares/authentication.js";

const routerOrder = Router()
routerOrder.post('/',authentication,createOrder)
routerOrder.get('/', authentication, getOrderByUserId)
routerOrder.post('/orderDetail', getOrderById)
routerOrder.post('/status', authentication, getOrderStatus)
routerOrder.post('/orderStatus', getOrderAdminStatus)
routerOrder.put('/updateStatusOrder', updateOrderStatus)

export default routerOrder