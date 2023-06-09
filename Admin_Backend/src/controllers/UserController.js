import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";

// user rgistration api

export async function saveUser(req, res) {
  try {
    const {name,email,password,confirmPassword} = req.body
    if(!name || !email || !password ||!confirmPassword)
    {
      
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: "Plz filled the field properly" })
    
    }
    else {
    const encryptedPassword = bcrypt.hashSync(req.body.password, 12);
    const encryptedConfirmPassword = bcrypt.hashSync( req.body.confirmPassword,12  );
    req.body["password"] = encryptedPassword;
    req.body["confirmPassword"] = encryptedConfirmPassword;

    const user = UserModel(req.body);
    const savedUser = await user.save();
    res
      .status(StatusCodes.CREATED)
      .json({
        data: savedUser,
        success: true,
        message: "user added successfully",
      });
    }
  } catch (error) {
    console.log("GHJH", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error in saving user", success: false });
  }
}

// fetch all user api

export async function fetchUser(req, res) {
  try {
    // const { q } = req.query
    // console.log("query is",q)
    // const keys = ["name", "email"]

    // const search = (data) =>{
    //   return data.filter((item)=>
    //   keys.some((key) => item[key].toLowerCase().includes(q))
    //   )
    // }

    const user = await UserModel.find().populate('postId');
    // res.status(StatusCodes.OK).json(search(user));
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "errror in fetching user" });
  }
}





export async function searchApi(req, res) {
  try {
    console.log(req.params.key)
    let data = await UserModel.find({
      $or: [
        { name: { $regex: req.params.key } },
        { email: {$regex: req.params.key}},
        
    ],
    });
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error in fetching user by search filter " });
  }
}

// User Login api

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
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in user login"})
  }
}





export async function fetchUserByObjId(req, res) {
  try {
    const user = await UserModel.findById(req.params.id).populate('postId');
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messsage: "error in fetching user by object id" });
  }
}

// update user api

export async function updateUser(req,res){
  try {
    const {name,email} = req.body

    if(!name || !email)
    {
      res.status(StatusCodes.BAD_REQUEST).json({message:"please fill all field "})
    }
    else{
    const user = await UserModel.findByIdAndUpdate(req.params.id,{name,email},{new:true})

    res.status(StatusCodes.OK).json(user)
    }
  } catch (error) {
    console.log("update error",error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in updating user"})
  }
}


// delete user api

export async function deleteUser(req,res){
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).json({message:"user Deleted successfully"})
    
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in deleting user"})
  }
}
