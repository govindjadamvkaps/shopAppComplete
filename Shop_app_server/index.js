import express from 'express'
import { StatusCodes } from 'http-status-codes'
import 'dotenv/config'
import { connectDb } from './src/db/DbConfig.js'
import ProductRouter from './src/routers/ProductRouter.js' 
import cors from 'cors'
import UserRouter from './src/routers/UserRouter.js'
import CartRouter from './src/routers/CartRouter.js'
import ContectRouter from './src/routers/ContactRouter.js'
import CategoryRouter from './src/routers/CategoryRouter.js'
import CheckOutRouter from './src/routers/CheckOutRouter.js'
import Stripe from './src/routers/Stripe.js'
import PaymentRouter from './src/routers/PaymentRouter.js'
import AdminRouter from './src/routers/AdminRouter.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(UserRouter)
app.use(ProductRouter)
app.use(CartRouter)
app.use(ContectRouter)
app.use(CategoryRouter)
app.use(CheckOutRouter)
app.use(AdminRouter)
app.use('/payment', PaymentRouter)
// app.use('/payment', Stripe)

app.use(express.urlencoded({ extended: false }))
app.use('/public',express.static('public'))

app.listen(5000,()=>{
    connectDb()
    console.log(`server is running on port 5000`)
})