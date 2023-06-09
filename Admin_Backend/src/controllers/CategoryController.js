import { StatusCodes } from "http-status-codes";
import CategoryModel from "../models/CategoryModel.js";

export async function saveCategory(req,res){
    try {
        const category =new CategoryModel(req.body)
        const savedCategory = await category.save()
        res.status(StatusCodes.CREATED).json({data:savedCategory, message:"category added successfully", success:true})
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in adding category" ,success:true})
    }
}

export async function fetchCategory(req,res){
    try {
        
        const category = await CategoryModel.find().populate('postId')
        res.status(StatusCodes.OK).json(category)
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in feching category"})
    }
}

export async function fetchCategoryByObjId(req,res){
    try {
        const category = await CategoryModel.findById(req.params.id)
        res.status(StatusCodes.OK).json(category)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching category By Object Id"})
    }
}

export async function fetchCategoryName(req,res){
    try {
        
        const category = await CategoryModel.find({},{title:1})
        res.status(StatusCodes.OK).json(category)
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in feching category"})
    }
}



export async function fetchCategoryAndDelete(req,res){
    try {
        const post = await CategoryModel.findByIdAndDelete(req.params.id)
        res.status(StatusCodes.NO_CONTENT).json({message:"post delete successfully"})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in deleting category"})
    }
}


export async function fetchCategoryAndUpdate(req,res){
    try {
        const {title} = req.body
        const category = await CategoryModel.findByIdAndUpdate(req.params.id,{title},{new:true})
        res.status(StatusCodes.OK).json(category)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in updating category"})
    }
}