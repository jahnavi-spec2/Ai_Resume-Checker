import express from "express";
import cors  from "cors";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
const app=express();

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use("/api2/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
