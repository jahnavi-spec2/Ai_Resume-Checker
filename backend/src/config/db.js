import mongoose from "mongoose";
import dns from "dns";
import { config } from "./env.js";

// Ensure Google DNS is used for SRV resolution on Windows
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
    try {
       const conn = await mongoose.connect(config.mongoUri);
       console.log(`✅ MONGODB Connected: ${conn.connection.host}`);

    } catch(error){ 
    console.log(`❌ MongoDB connected failed: ${error.message}`);
    process.exit(1);

    }
}

export default connectDB;