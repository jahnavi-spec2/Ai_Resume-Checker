import mongoose from "mongoose";
import {config} from "./env.js";

const connectDB= async() =>{
    try{
       const conn=await mongoose.connect(config.mongoUri);
       console.log(`✅ MONGODB Connected :{conn.connection.host}`);

    } catch(error){ 
    console.log(`❌ MongoDB connected failed: ${error.message}`);
    process.exit(1);

    }
}

export default connectDB;