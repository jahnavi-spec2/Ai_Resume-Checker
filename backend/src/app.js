import express from "express";
import cors  from "cors";
import authRouter from "./routes/user.router.js";
import cookieParser from "cookie-parser";
import { notFound } from "./middleware/errorHandler.js";
import errorHandler from "./middleware/errorHandler.js";
const app=express();

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use("/api1/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
