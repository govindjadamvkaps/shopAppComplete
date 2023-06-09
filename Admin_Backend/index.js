import express from 'express'
import 'dotenv/config'
import dbConnection from './src/db/DbConfig.js'
import AdminRouter from './src/routers/AdminRouter.js'
import UserRouter from './src/routers/UserRouter.js'
import PostRouter from './src/routers/PostRouter.js'
import cors from 'cors'
import CategoryRouter from './src/routers/CategoryRouter.js'
import Stripe from './src/routers/Stripe.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/public',express.static('public'))
app.use(AdminRouter)
app.use(UserRouter)
app.use(CategoryRouter)
app.use(PostRouter)
app.use('/payment', Stripe)
// app.use(express.static())

// app.get("/",(req,res)=>{
//     res.send("hello")
// })

app.listen(process.env.PORT,()=>{
    dbConnection()
    console.log(`server is listning on port ${process.env.PORT}`)
})