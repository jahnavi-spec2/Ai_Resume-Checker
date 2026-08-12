import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from  "../utils/ApiError.js";
import User from "../models/user.model.js";

export const verifyJWT= asyncHandler(async(req,_res,next)=>{
    
})