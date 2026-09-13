import express from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
  analyzeJobMatch,
  getUserJobMatches,
  getJobMatchById,
  deleteJobMatch,
} from "../controllers/jobMatch.controller.js";

const router = express.Router();

router.use(verifyJWT);

// POST /api/v1/job-matching/analyze
router.post("/analyze", analyzeJobMatch);

// GET job-matching 
router.get("/", getUserJobMatches);

// GET /job-matching/:id 
router.get("/:id", getJobMatchById);

// DELETE /api/v1/job-matching/:id
router.delete("/:id", deleteJobMatch);

export default router;
