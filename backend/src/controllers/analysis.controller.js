import Resume from "../models/resume.model.js";
import Analysis from "../models/analysis.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { analyzeResumeText } from "../services/ai.services.js";

// POST /api/v1/resumes/:id/analyze
export const analyzeResume = asyncHandler(async (req, res) => {
  const { id: resumeId } = req.params;
  const { targetRole } = req.body;

  const resume = await Resume.findOne({
    _id: resumeId,
    user: req.user._id,
  });

  if (!resume) {
    throw ApiError.notFound("Resume not found");
  }

  // Find the target version (current active version or initial version)
  const activeVersion =
    resume.versions.id(resume.currentVersionId) || resume.versions[0];

  if (!activeVersion || !activeVersion.rawText) {
    throw ApiError.badRequest("Selected resume version has no text content to analyze");
  }

  // Evaluate text with Gemini AI
  const aiResult = await analyzeResumeText(activeVersion.rawText, targetRole || "");

  // Create and save analysis record
  const analysis = await Analysis.create({
    user: req.user._id,
    resume: resume._id,
    version: activeVersion._id,
    targetRole: targetRole || "",
    score: aiResult.score,
    strengths: aiResult.strengths,
    issues: aiResult.issues,
    missingKeywords: aiResult.missingKeywords,
    rewrites: aiResult.rewrites,
  });

  return res.status(201).json(
    new ApiResponse(201, { analysis }, "Resume analyzed successfully")
  );
});
