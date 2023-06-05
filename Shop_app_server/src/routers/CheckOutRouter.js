import express from 'express'
import { fetchCheckout, postCheckout } from '../controllers/CheckOutController.js'

const CheckOutRouter = express.Router()

CheckOutRouter.post("/post-checkout", postCheckout)
CheckOutRouter.get("/get-checkout", fetchCheckout)

export default CheckOutRouter
