import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'
import jwtDecode from 'jwt-decode'


 const TokenVerification=async(req,res,next)=>{
    try {
        const auth  =await req.header('Authorization')
         const token = auth.replace("Bearer ","")

         const verifyUser =await jwt.verify(token, process.env.SECRET_KEY)
        if(!verifyUser){
            console.log("token verification =>", error)
            res.status(StatusCodes.UNAUTHORIZED).json({message:"token is not verifyed"})
        }
        else{
            req.token = token
            console.log(jwtDecode(token)._id);
            const user = await UserModel.findById(verifyUser._id)
            console.log(user)
            
            req.user = jwtDecode(token)._id;
            next()
        }

    } catch (error) {
        console.log("token verification =>", error)
        res.status(StatusCodes.UNAUTHORIZED).json({message:"Access deniyed"})
    }
} 

export default TokenVerification