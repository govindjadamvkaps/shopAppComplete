import express from 'express'
import { fetchCategory, fetchCategoryByObjId, saveCategory } from '../controllers/CategoryController.js'

const CatergoryRouter = express.Router()

CatergoryRouter.post("/categorys", saveCategory)
CatergoryRouter.get("/categorys", fetchCategory)
CatergoryRouter.get("/categorys/:id", fetchCategoryByObjId)

export default CatergoryRouter