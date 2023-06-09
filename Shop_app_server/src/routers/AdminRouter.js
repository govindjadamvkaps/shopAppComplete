import express from 'express'
import { fetchAdmin, login, saveAdmin } from '../controllers/AdminController.js'

const AdminRouter = express.Router()

AdminRouter.post("/admins", saveAdmin)
AdminRouter.get("/admins",fetchAdmin)
AdminRouter.post("/admins/login", login)

export default AdminRouter