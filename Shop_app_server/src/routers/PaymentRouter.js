import express from 'express'
import { postPayment } from '../controllers/PaymentController.js'


const PaymentRouter = express()

PaymentRouter.post('/create-checkout-session',postPayment)


export default PaymentRouter