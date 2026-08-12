import {verifyToken} from "../utils/jwt.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from  "../utils/ApiError.js";
import User from "../models/user.model.js";

export const verifyJWT= asyncHandler(async(req,res,next)=>{


    const token=req.cookies?.accessToken || 
                req.header("Authorization")?.replace("Bearer ","");

                if(!token){
                    throw ApiError.unauthorized("No token provided")
                }

                let decodedToken;
                try{
               decodedToken=verifyToken(token);
                }
                catch(error){
                   throw ApiError.unauthorized("Invalid or expired token");

                }
        const user = await User.findById(decodedToken._id)
        .select("-password");

    if (!user) {
        throw ApiError.unauthorized("User no longer exists");
    }
    req.user = user;
    next();
});

export default verifyJWT;