import PostModel from "../models/PostModel.js";
import { StatusCodes } from "http-status-codes";
import UserModel from "../models/UserModel.js";
import mongoose from "mongoose";


export async function savePost(req,res){

    try {
        // const userId = req.body.userId
        console.log("req.body==>",req.body)
        console.log("req.body==>",req.body.userId)
       
        // const userId = mongoose.Types.ObjectId(req.body.userId)
        // console.log("object id",userId)
        // const posts = await PostModel.find({userId: req.user});
        // console.log(posts)
        // const postsLength = posts.length;
        
        // if(postsLength == 5){
            //     return res.status(200).json({
                //         success: false,
                //         message: 'Your limit for posting free blogs exhausted, please purchase subscription'
                //     })
                // }
            

                const image = (req.file)?req.file.filename: null       
                const {title, category, description,userId} = req.body
                // const userId = req.user; 
                // console.log(req.user)
                // console.log("dfsdf",userId)
                // const user =await UserModel.findById(req.user)
                const user = await UserModel.findById(userId)
                console.log(user)
                if(user){

                    const post = new PostModel({title, category,description, image,userId})
                    const savedPost = await post.save()
                    user.postId.push(savedPost._id)
                    await user.save()
                    // const user = await UserModel.findOne({email:req.body.userEmail})
                    // console.log(user)
                    
            // console.log(user)
            // user.postId.push(savedPost._id)
            // req.user.save()
    
            return res.status(StatusCodes.CREATED).json({data:savedPost, message:"post saved successfuly ",success:true})
                }
                else{
                    const post = new PostModel({title, category,description, image,userId})
                    const savedPost = await post.save()

            return res.status(StatusCodes.CREATED).json({data:savedPost, message:"post saved successfuly ",success:true})
                }
    } catch (error) {
        console.log("error...",error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in saving post", success:false})
    }
}

export async function fetchPost(req,res){
    try {
        const post  = await PostModel.find().populate({path: 'categoryId', populate: {
            path: 'userId'
        }})
        res.status(StatusCodes.OK).json({data:post , message:"post fetch successfully", success:true})
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching post"})
    }
}


export async function fetchPostByObjId(req,res){
    try {
        const post  = await PostModel.findById(req.params.id).populate({path: 'categoryId', populate: {
            path: 'userId'
        }})
        res.status(StatusCodes.OK).json({data:post , message:"post fetch successfully", success:true})
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching post by "})
    }
}



export async function fetchPostAndUpdate(req,res){
    try {
        console.log(req.body)
        // const image = (req.file)?req.file.filename: null       
        const image = req.file.filename     
        const {title, category, description} = req.body

        const post  = await PostModel.findByIdAndUpdate(req.params.id,{title, category,description, image} ,{new:true})
        res.status(StatusCodes.OK).json({data:post, success:true, message:"post update successfully"})

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in updating post"})
    }
}


export async function fetchPostAndDelete(req,res){
    try {
        const post = await PostModel.findByIdAndDelete(req.params.id)
        res.status(StatusCodes.NO_CONTENT).json({message:"post delete successfully"})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in deleting post"})
    }
}