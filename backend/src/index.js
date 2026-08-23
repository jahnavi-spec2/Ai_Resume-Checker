
import "dotenv/config";
console.log("MONGO_URI =", process.env.MONGO_URI);
console.log("JWT_SECRET =", process.env.JWT_SECRET ? "FOUND" : "MISSING");
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../backend/.env") });


import app from "./app.js";
import connectDB from "./config/db.js"


import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
const Port = process.env.PORT || 3000;


connectDB()
.then(()=>{
app.listen(Port, ()=>{
    console.log(`Server is running on port http://localhost:${Port}`);
});
})
.catch((err)=>{
    console.error("Error starting server:", err);
     process.exit(1)
});
