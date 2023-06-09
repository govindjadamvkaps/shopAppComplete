import express from 'express'
import { fetchUser, fetchUserById, findByIdAndDeleteUser, loginUser, saveUser } from '../controllers/UserController.js'


const UserRouter = express.Router()

UserRouter.post("/sign-up", saveUser)
UserRouter.get("/users", fetchUser)
UserRouter.get("/users/:id", fetchUserById)
UserRouter.delete('/users/delete/:id',findByIdAndDeleteUser)


UserRouter.post("/login", loginUser)

export default UserRouter