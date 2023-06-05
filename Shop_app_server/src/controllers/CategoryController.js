import { StatusCodes } from "http-status-codes";
import CategoryModel from "../models/CategoryModel.js";

export const saveCategory = async(req,res)=>{
    try {
        const  category = CategoryModel(req.body)
        const savedCategory =await category.save()
        res.status(StatusCodes.CREATED).json({data:savedCategory, message:"category save successfully ", success:true})
    } catch (error) {
        console.log("error in fetching category",error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in add category  "})
    }
} 

export const fetchCategory = async(req,res)=>{
    try {
        const category = await CategoryModel.find()
        res.status(StatusCodes.OK).json(category)
    } catch (error) {
        console.log("error in fetching category", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetch all category "})
    }
}


export const fetchCategoryByObjId = async(req,res)=>{
    try {
        const category = await CategoryModel.findById(req.params.id)
        res.status(StatusCodes.OK).json(category)
    } catch (error) {
        console.log("error in fetch category by Id");
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching Category by Object Id" ,error})
    }
} 


