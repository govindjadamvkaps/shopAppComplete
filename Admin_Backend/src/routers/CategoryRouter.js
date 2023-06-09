import express from 'express'
import { fetchCategory, fetchCategoryAndDelete, fetchCategoryAndUpdate, fetchCategoryByObjId, fetchCategoryName, saveCategory } from '../controllers/CategoryController.js'

const CategoryRouter = express.Router()

CategoryRouter.post("/categorys", saveCategory)
CategoryRouter.get("/categorys", fetchCategory)
CategoryRouter.get("/categorys/name", fetchCategoryName)

CategoryRouter.get("/categorys/:id", fetchCategoryByObjId)
CategoryRouter.delete('/categorys/delete/:id',fetchCategoryAndDelete)
CategoryRouter.put('/categorys/update/:id',fetchCategoryAndUpdate)

export default CategoryRouter