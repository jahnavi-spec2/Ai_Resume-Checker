import jwt from "jsonwebtoken";
import env from "../config/env.js";
export const signToken=(payload)=>{
    return jwt.sign(

    payload,
   env.jwtSecret,
    {
        expiresIn: env.jwtExpiry || "10d"
    }
    )
};

export const verifyToken=(token)=>{
   return jwt.verify(token,env.jwtSecret);
};

export const cookieOptions={
    httpOnly:true,
    secure:process.env.isProd,
    sameSite:process.env.isProd?"none":"lax",
    maxAge:10*24*60*60*1000,
    path:"/"
}