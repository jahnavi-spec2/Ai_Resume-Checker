import express from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { getDashboardStats } from "../controllers/dashboard.controller.js";

const router = express.Router();


router.use(verifyJWT);

// GET /api/v1/dashboard/stats
router.get("/stats", getDashboardStats);

export default router;
