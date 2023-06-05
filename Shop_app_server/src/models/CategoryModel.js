import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category:{type:String , required:true},

    productId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"product"
        }
    ]
},{
    timestamps:true
})

const CategoryModel = new mongoose.model('category', categorySchema)

export default CategoryModel ;