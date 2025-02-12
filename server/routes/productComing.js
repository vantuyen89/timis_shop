import { Router } from "express";
import { getAllProductComings, getProductComingById, getProductComings, postProductComing, updateProductComing } from "../controllers/productComing.controller.js";


const routerProductComing = Router()

routerProductComing.post(`/`, postProductComing)

routerProductComing.get(`/`, getAllProductComings)

routerProductComing.get('/productActive', getProductComings)

routerProductComing.put(`/productActive/:id`, updateProductComing)

routerProductComing.get(`/productActive/:id`, getProductComingById)

export default routerProductComing