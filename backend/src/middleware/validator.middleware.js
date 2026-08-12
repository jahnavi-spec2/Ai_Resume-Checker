import {validationResult} from "express-validator";
import {ApiError} from "../utils/ApiError.js"

export const validate=(req,res,next)=>{

    const error=validationResult(req);

    if(error.isEmpty())
        return next();

        const extractedErrors=[];

        error.array().forEach((err)=>{
  extractedErrors.push(err.msg)});
        

  throw new ApiError(422,"Received data is invalid",extractedErrors)
}