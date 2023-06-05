import express from 'express'
import { postContact } from '../controllers/ContactController.js'

const ContectRouter = express.Router()

ContectRouter.post('/post-message', postContact)

export default ContectRouter