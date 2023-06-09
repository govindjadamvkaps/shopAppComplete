import express from 'express'
import { deleteUser, fetchUser, fetchUserByObjId, loginUser, saveUser, searchApi, updateUser } from '../controllers/UserController.js'
import TokenVerification from '../middleware/VerifyToken.js'

const UserRouter = express.Router()

UserRouter.post('/users',saveUser)
UserRouter.get('/users', fetchUser)
UserRouter.get('/users/:id',fetchUserByObjId)
UserRouter.get("/users/search/:key",searchApi)
UserRouter.post('/users/login', loginUser)
UserRouter.put('/users/update/:id',updateUser)

UserRouter.delete('/users/delete/:id', deleteUser)


export default UserRouter