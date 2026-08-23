import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import{signToken,cookieOptions} from "../utils/jwt.js";


export const registerUser= asyncHandler(async(req,res)=>{
    const {name,email,password}= req.body;
    if(!name || !email|| !password)
        throw  ApiError.badRequest("Required Field");


    const existingUser=await User.findOne({
        email:email.toLowerCase()
    });

    if(existingUser){
        throw ApiError.conflict("A user with the email already exists ");
    }

    const user =await User.create({
       
        email:email.toLowerCase(),
        password,
         name
    });

    const accessToken=signToken({
        _id:user._id
    })

    const createdUser=await User.findById(user._id)
    .select("-password");// it prevents actual password to be seenn or revealed 


    return res.status(201)
    .cookie("accessToken",accessToken, cookieOptions)
    .json(
        new ApiResponse(
            201,
            {user:createdUser},
            "User created successfully"
        )
    );
});

//POST/API/AUTH/LOGIN
export const loginUser=asyncHandler(async(req,res)=>{


    const {email,password}=req.body;

    if(!email || !password)
        throw ApiError.badRequest("Email and password are required");


const user =await User.findOne({
    email:email.toLowerCase(),

});
if(!user)
    throw ApiError.unauthorized("Invalid email or password ");


const isPasswordValid= await user.isPasswordCorrect(password);

if(!isPasswordValid)
throw ApiError.unauthorised("Password is incorrect");
 
// the old token may:

// have expired
// have been deleted/cleared during logout
// belong to an old login session
// generate new accesssToken...
const accessToken= signToken({
    _id:user._id
});

const loggedInUser=await User.findById(user._id)
   .select("-password");

   return res.status(200)
   .cookie("accessToken",accessToken,cookieOptions)
   .json(
    new ApiResponse(
        200,
        {user:loggedInUser},
        "Logged in sucessfully"
    )
   );
});


export const logoutUser=asyncHandler(async(req,res)=>{
    return res.status(200)
    .clearCookie("accessToken",cookieOptions)
    .json(
        new ApiResponse(200,{},"Logged out sucessfully")
    );
})

//GET/api/auth/me

export const getCurrentUser= asyncHandler(async(req,res)=>{
    return res
      .status(200)
      .json(
        new ApiResponse(200,
            {
                user:req.user
            },
            "Current user fetched sucessfully"
        )
      )
});