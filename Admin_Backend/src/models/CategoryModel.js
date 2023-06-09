import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title:{ type:String, required:true},
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    }
},
{
    timestamps:true
})


const CategoryModel = new mongoose.model('category',categorySchema)

export default CategoryModel;