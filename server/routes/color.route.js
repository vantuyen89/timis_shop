import { Router } from "express";
import { createColor, getAllColor } from "../controllers/color.controller.js";


const routerColor = Router()

routerColor.get('/getAllColor', getAllColor)
routerColor.post('/addColor', createColor)

export default routerColor