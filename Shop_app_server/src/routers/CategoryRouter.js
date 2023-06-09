import express from 'express'
import { fetchCategory, fetchCategoryByObjId, findByIdAndDeleteCategory, saveCategory } from '../controllers/CategoryController.js'

const CategoryRouter = express.Router()

CategoryRouter.post("/categorys", saveCategory)
CategoryRouter.get("/categorys", fetchCategory)
CategoryRouter.get("/categorys/:id", fetchCategoryByObjId)
CategoryRouter.delete('/categorys/delete/:id',findByIdAndDeleteCategory )

export default CategoryRouter