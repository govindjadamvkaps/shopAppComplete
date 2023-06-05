import { StatusCodes } from "http-status-codes";
import ContactModel from "../models/ContectModel.js";

export const postContact = async(req,res) =>{
    try {
        console.log("contact body",req.body)
        const contact = ContactModel(req.body)
        const savedContect = await contact.save()
        
        res.status(StatusCodes.CREATED).json({data:savedContect, message:"message saved successfully", success:true})
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in send message" , success:false})   
    }
}
