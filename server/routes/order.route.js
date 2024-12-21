import { Router } from "express";
import { createOrder, getOrderAdminStatus, getOrderById, getOrderByUserId, getOrderStatus, updateOrderStatus, createOrderPaymentVNPAY, returnUrlVNPAY } from "../controllers/order.controller.js";
import authentication from "../middlewares/authentication.js";

const routerOrder = Router()
routerOrder.get("/detail", (req, res) => {
    return res.send("Tuyên dzai")
})
routerOrder.post('/', authentication, createOrder)
routerOrder.get('/', authentication, getOrderByUserId)
routerOrder.post('/orderDetail', getOrderById)
routerOrder.post('/status', authentication, getOrderStatus)
routerOrder.post('/orderStatus', getOrderAdminStatus)
routerOrder.put('/updateStatusOrder', updateOrderStatus)

routerOrder.post(
    '/createOrderPaymentVNPAY',
    authentication,
    createOrderPaymentVNPAY
);

routerOrder.get(
    "/returnVnPay",
    authentication,
    returnUrlVNPAY
);

export default routerOrder