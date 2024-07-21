import { Router } from "express";
import { addItemCart, decreaseQuantity, getAllCartUser, getCartByUser, increaseQuantity, removeCart } from "../controllers/cart.controller.js";
import authentication from "../middlewares/authentication.js";

const routerCart = Router()

routerCart.post('/getCart',authentication,getCartByUser)
routerCart.post('/addProductToCart', authentication, addItemCart)
routerCart.post('/removeCart', authentication, removeCart)
routerCart.post('/increment', authentication, increaseQuantity)
routerCart.post('/decrement', authentication, decreaseQuantity)
routerCart.get('/cartUser', authentication, getAllCartUser)

export default routerCart