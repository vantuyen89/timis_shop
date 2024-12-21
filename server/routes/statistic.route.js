import { Router } from "express";
import { statistic, totalOrder } from "../controllers/statistic.controller.js";


const statisticRouter = Router()

statisticRouter.get(`/`, statistic)
statisticRouter.post(`/order`, totalOrder)


export default statisticRouter;