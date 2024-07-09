import { Router } from "express";
import { addItemCart, getCartByUser } from "../controllers/cart.controller.js";

const routerCart = Router()

routerCart.post('/getCart/:id',getCartByUser)

routerCart.post('/addProductToCart', addItemCart)

export default routerCart