import { Router } from "express";
import { createSize, getAllSize, getSizeId, updateSize } from "../controllers/size.controller.js";


const routerSize = Router()

routerSize.get('/getAllSize', getAllSize)
routerSize.post('/addSize', createSize)
routerSize.put('/updateSize/:id', updateSize)
routerSize.get('/getSizeId/:id',getSizeId)


export default routerSize


