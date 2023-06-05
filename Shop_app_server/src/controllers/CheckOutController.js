import { StatusCodes } from "http-status-codes";
import CheckOutModel from "../models/ChekOutModel.js";

export async function postCheckout(req,res){
    try {
        const { fname, lname,  country,email,phone,state,pincode,orderNotes,cuponCode,address} =req.body.data

        const userId = req.body.userId
        // const checkout = CheckOutModel(req.body)
        const checkout = CheckOutModel({fname, lname,  country,email,phone,state,pincode,orderNotes,cuponCode,address,userId})
          
        const saveCheckout = await checkout.save() 

        res.status(StatusCodes.CREATED).json({data:saveCheckout, message:"data save successfully", success:true})

    } catch (error) {
        console.log("error in saving checkout data", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in add post", success:false})
    }
}

export async function fetchCheckout(req,res){
    try {
        const checkout = await CheckOutModel.find() 

        res.status(StatusCodes.OK).json({data:checkout, message:"data find successfully" , success:true})
    } catch (error) {
        console.log("error in find checkout data", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching data" , success:false})
    }
}