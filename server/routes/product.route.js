import { Router } from "express";
import { createProduct, getAllproducts, getProductById, getProductfeatured, getProductPrice, getProductRelated, pagingProduct } from "../controllers/product.controller.js";


const routerProduct = Router()
routerProduct.get('/getAllProducts',getAllproducts)
routerProduct.post('/addProduct', createProduct)
routerProduct.post('/productPaging', pagingProduct)
routerProduct.post('/productFeatured', getProductfeatured)
routerProduct.post('/productPrice', getProductPrice)
routerProduct.post('/productRelated', getProductRelated)
routerProduct.get('/getProductById/:id',getProductById)

export default routerProduct