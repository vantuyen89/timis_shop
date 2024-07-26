import { Router } from "express";
import { createProduct, getAllproducts, getProductById, getProductfeatured, getProductPrice, getProductPriceMax, getProductRelated, pagingProduct, sortPagingProduct, updateProduct } from "../controllers/product.controller.js";


const routerProduct = Router()
routerProduct.get('/getAllProducts',getAllproducts)
routerProduct.post('/addProduct', createProduct)
routerProduct.post('/productPaging', pagingProduct)
routerProduct.post('/productFeatured', getProductfeatured)
routerProduct.post('/productPrice', getProductPrice)
routerProduct.post('/productRelated', getProductRelated)
routerProduct.get('/getProductById/:id', getProductById)
routerProduct.post('/shop', sortPagingProduct)
routerProduct.get('/productPriceMax', getProductPriceMax)
routerProduct.put('/productUpdated/:id',updateProduct)

export default routerProduct