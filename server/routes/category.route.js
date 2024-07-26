import { Router } from "express";
import { createCategory, getAllCategory, getCategoryById, updateCategory } from "../controllers/category.controller.js";
const routerCate = Router()

routerCate.get('/getAll', getAllCategory)
routerCate.get('/getCateById/:id',getCategoryById)
routerCate.post('/pagingCate')
routerCate.post('/addCate', createCategory)
routerCate.put('/updateCateById/:id',updateCategory)
routerCate.delete('/deleteCateById')

export default routerCate

