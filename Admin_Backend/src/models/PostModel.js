import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{type:String, required:true},
    category:{type:String, required:true},
    image:{type:String, required:true},
    description:{type:String, required:true},
    
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }

},{
    timestamps:true
})

const PostModel = new mongoose.model('post',postSchema)

export default PostModel