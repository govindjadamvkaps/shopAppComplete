import express from 'express'
import { addToCart, deleteAddToCart, deleteCart, fetchAllCart, fetchCartByUserId, saveCart } from '../controllers/CartController.js'

const CartRouter = express.Router()

// CartRouter.post('/insert-cart', saveCart)
CartRouter.post('/insert-cart', addToCart)
CartRouter.get('/get-cart', fetchAllCart)
CartRouter.delete('/delete-cart', deleteCart)

CartRouter.get('/get-cart/:id', fetchCartByUserId)
// CartRouter.delete('/delete-cart/:id',deleteCart)
CartRouter.delete('/delete-cart/:userId/:pid',deleteAddToCart)
export default CartRouter