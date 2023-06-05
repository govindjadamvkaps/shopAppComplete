import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  pName: { type: String, required: true },
  pImage: { type: String, required: true },
  pPrice: { type: Number, required: true },
  pDescription: { type: String, required: true },
  noOfProduct: { type: Number },
  category:{type:String},
  caregoryId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
  ],
},{
    timestamps:true
});


export const ProductModel = new mongoose.model("product", productSchema)