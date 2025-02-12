import { Router } from "express";
import { get1year, get7days, statistic, totalOrder } from "../controllers/statistic.controller.js";


const statisticRouter = Router()

statisticRouter.get(`/`, statistic)
statisticRouter.post(`/order`, totalOrder)
statisticRouter.get(`/get7days`, get7days)
statisticRouter.post(`/get1year`, get1year)


export default statisticRouter;