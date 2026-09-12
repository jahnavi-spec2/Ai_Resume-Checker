import express from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
  getUserAnalyses,
  getAnalysisById,
  getResumeAnalyses,
  deleteAnalysis,
} from "../controllers/analysis.controller.js";

const router = express.Router();

// All analysis history routes require authentication
router.use(verifyJWT);

// GET /api/v1/analyses - Get all analysis history for logged-in user
router.get("/", getUserAnalyses);

// GET /api/v1/analyses/resume/:resumeId - Get analysis history for a specific resume
router.get("/resume/:resumeId", getResumeAnalyses);

// GET /api/v1/analyses/:id - Get single analysis details
router.get("/:id", getAnalysisById);

// DELETE /api/v1/analyses/:id - Delete single analysis record
router.delete("/:id", deleteAnalysis);

export default router;
