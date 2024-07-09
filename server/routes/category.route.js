import { Router } from "express";
import { createCategory, getAllCategory } from "../controllers/category.controller.js";
const routerCate = Router()

routerCate.get('/getAll', getAllCategory)
routerCate.get('/getCateById')
routerCate.post('/pagingCate')
routerCate.post('/addCate', createCategory)
routerCate.put('/updateCateById/:id')
routerCate.delete('/deleteCateById')

export default routerCate

