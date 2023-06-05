import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: {type:String, required:true},
    email: { type: String, required: true, unique:true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
  
    tokens:[{
      token:{type:String, required:true}
  }]
    
  },
  {
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
  

  
  export const UserModel = new mongoose.model("user", userSchema);