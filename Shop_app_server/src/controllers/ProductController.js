import { StatusCodes } from "http-status-codes";
import { ProductModel } from "../models/ProductModel.js";


export async function saveProduuct(req,res){
    try {
        const pImage = (req.file)?req.file.filename: null       
        const {pName, pCategory,pPrice, pDescription,category} = req.body


        // const user = await UserModel.findById(userId)
        // console.log(user)

        const product = new ProductModel({pName, pCategory,pPrice, pDescription,pImage,category})
        const savedPost = await product.save()

        // user.postId.push(savedPost._id)
        // await user.save()

        res.status(StatusCodes.CREATED).json({data:savedPost, message:"post saved successfuly ",success:true})
    } catch (error) {
        console.log(error)
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in saving post", success:false})
    }
}


export async function fetchAllProduct(req,res){
    try {
        const product = await ProductModel.find()
        res.status(StatusCodes.OK).json({data:product, message:"data fetch successfully", success:true})
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching data"})
    }
}


export async function fetchProductById(req,res){
    try {
        const product = await ProductModel.findById(req.params.id)
        res.status(StatusCodes.OK).json(product)
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Error in fetching product by Object id"})
    }
}


 export const fetchProductByCategory = async(req,res)=>{
try {
    // console.log("category data", req.params.category)
    const product = await ProductModel.find({category:req.params.category})
    res.status(StatusCodes.OK).json({data:product, message:"data fetched by category" , success:true})
} catch (error) {
    console.log('error in fetching data by category ',error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching data by category Id"})
}
}


export async function productMen(req,res){
    try {
        const product = await ProductModel.find({category:"men"})
        res.status(StatusCodes.OK).json(product)
    } catch (error) {
        console.log("error in fetching product by men category")
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching data by category Id"})
    }
}

export async function productWomen(req,res){
    try {
        const product = await ProductModel.find({category:"women"})
        res.status(StatusCodes.OK).json(product)
    } catch (error) {
        console.log("error in fetching product by men category")
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching data by category of women"})
    }
}

export async function productChildren(req,res){
    try {
        const product = await ProductModel.find({category:"children"})
        res.status(StatusCodes.OK).json(product)
    } catch (error) {
        console.log("error in fetching product by men category")
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching data by category Id"})
    }
}