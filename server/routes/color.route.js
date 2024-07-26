import { Router } from "express";
import { createColor, getAllColor, getColorId, updateColor } from "../controllers/color.controller.js";


const routerColor = Router()

routerColor.get('/getAllColor', getAllColor)
routerColor.post('/addColor', createColor)
routerColor.put('/updateColor/:id', updateColor)
routerColor.get('/getColorId/:id',getColorId)

export default routerColor