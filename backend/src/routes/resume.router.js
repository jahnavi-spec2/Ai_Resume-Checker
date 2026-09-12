import express from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { uploadMiddleware } from "../middleware/upload.middleware.js";
import {
  uploadResume,
  getUserResumes,
  getResumeById,
  deleteResume,
  addResumeVersion,
  setCurrentVersion,
  getResumeVersions,
} from "../controllers/resume.controller.js";
import { analyzeResume } from "../controllers/analysis.controller.js";

const router = express.Router();

// All resume routes require authentication
router.use(verifyJWT);

router.post("/upload", uploadMiddleware, uploadResume);
router.get("/", getUserResumes);
router.get("/:id", getResumeById);
router.delete("/:id", deleteResume);
router.post("/:id/analyze", analyzeResume);

// Resume Version Routes
router.post("/:id/versions", addResumeVersion);
router.patch("/:id/current-version", setCurrentVersion);
router.get("/:id/versions", getResumeVersions);

export default router;
