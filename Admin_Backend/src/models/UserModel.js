import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
  avtar:{type:String},
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone:{type: String},
  confirmPassword: { type: String},
  isPaid:{type: Boolean, default:false},
  
  postId:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"post"
  }],
  
  tokens:[{
    token:{type:String, required:true}
}]
},{
    timestamps:true
});

userSchema.methods.generateAuthToken = async function(){
  try {
      // console.log("token code")
      const token = await jwt.sign({_id:this._id}, process.env.SECRET_KEY,{expiresIn:"2h"})    
      this.tokens = this.tokens.concat({token:token})

      await this.save()
      return token;
  } catch (error) {
      console.log("error in genreting token", error)
  }
  
}




const UserModel = new mongoose.model("user", userSchema)

export default UserModel;
