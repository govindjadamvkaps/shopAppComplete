import { StatusCodes } from "http-status-codes"
import PaymentModel from "../models/PaymentModel"

export const savePayment = async(req,res)=>{
    try {
        const payment = new PaymentModel(req.body)
        const savedPayment = await payment.save()
        res.status(StatusCodes.CREATED).json({data :savedPayment, success:true})
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in saveing data"})  
    }
}