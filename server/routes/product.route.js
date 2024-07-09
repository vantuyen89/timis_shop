import { Router } from "express";
import { createProduct, getAllproducts, pagingProduct } from "../controllers/product.controller.js";


const routerProduct = Router()
routerProduct.get('/getAllProducts',getAllproducts)
routerProduct.post('/addProduct', createProduct)
routerProduct.post('/productPaging',pagingProduct)

export default routerProduct