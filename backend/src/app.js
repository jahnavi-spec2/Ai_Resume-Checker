import express from "express";
import cors  from "cors";
import authRouter from "./routes/user.router.js";
import resumeRouter from "./routes/resume.router.js";
import analysisRouter from "./routes/analysis.router.js";
import dashboardRouter from "./routes/dashboard.router.js";
import jobMatchRouter from "./routes/jobMatch.router.js";

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

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/resumes", resumeRouter);
app.use("/api/v1/analyses", analysisRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/job-matching", jobMatchRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
