import { StatusCodes } from "http-status-codes";
import AdminModel from "../models/AdminModel.js";
import jwt from 'jsonwebtoken'
import bcrypt, { compareSync } from 'bcrypt'
export async function saveAdmin(req,res){
    try {
            const encryptedPassword = bcrypt.hashSync(req.body.password, 10)
            req.body['password'] = encryptedPassword
            const admin = AdminModel(req.body)
            // console.log(admin)
            const savedAdmin =await admin.save()
            // console.log(savedAdmin)
            res.status(StatusCodes.CREATED).json(savedAdmin)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:"error in saving data"})
    }
}

export async function fetchAdmin(req,res){
    try {
        const admin = await AdminModel.find()
        res.status(StatusCodes.OK).json(admin)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:"error in fetching data"})
    }
}


export async function login(req,res){
    try {
        const email= req.body.email
        const password = req.body.password

        const admin = await AdminModel.findOne({email:email})
        console.log(admin)
        // const isPasswordMatch = (password===admin.password)
        const isPasswordMatch  =await bcrypt.compare(password,admin.password)
        console.log(isPasswordMatch)
          if(!isPasswordMatch){
            res.status(StatusCodes.BAD_REQUEST).json({message:"invalid credentials"})
        }
        else{
            const token = await jwt.sign({_id:admin._id},process.env.SECRET_KEY,{expiresIn:"2h"})
            res.status(StatusCodes.OK).json({data:admin, token:token})
        }

       
        
    } catch (error) {
        console.log("error in admin login", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message:"error in login data"})
    }
}