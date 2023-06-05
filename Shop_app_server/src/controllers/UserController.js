import { UserModel } from "../models/UserModel.js"
import { StatusCodes } from "http-status-codes"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function saveUser(req,res){
    try {
        const encryptedPassword = bcrypt.hashSync(req.body.password, 10)      
        req.body['password']= encryptedPassword
        
        const admin = UserModel(req.body)

        const savedAdmin = await admin.save()
        res.status(StatusCodes.CREATED).json({data:savedAdmin, message:"user save successfully ", success:true})
    } catch (error) {
        console.log("error in saving user", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in saving admin"})
    }
}

export async function fetchUser(req,res){
    try {
        const admin  = await UserModel.find()
        res.status(StatusCodes.OK).json(admin)
    } catch (error) {
        console.log("error in fetching user", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching admin"})
    }
}


export async function fetchUserById(req,res){
    try {
        const admin = await UserModel.findById(req.params.id)
        res.status(StatusCodes.OK).json(admin)
    } catch (error) {
        console.log("error in fetching user by object id", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching admin by obj Id"})
    }
}



// Login api

export async function loginUser(req,res){
    try {
      const email = req.body.email
      const password = req.body.password
  
      const user = await UserModel.findOne({email:email})
  
      const isPasswordMatch = bcrypt.compareSync(password,user.password)
  
      if (!email || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "please fill email and password" })
    }
    else if(!isPasswordMatch){
      
  
        res.status(StatusCodes.BAD_REQUEST).json({message:"invalid credentials"})
      }
      else{
        const token = await user.generateAuthToken()
        res.status(StatusCodes.OK).json({data:user, token:token})
      }
    } catch (error) {
      console.log("Error in login",error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in user login"})
    }
  }
  