import { Router } from "express";
import { createSize, getAllSize } from "../controllers/size.controller.js";


const routerSize = Router()

routerSize.get('/getAllSize', getAllSize)
routerSize.post('/addSize', createSize)


export default routerSize


