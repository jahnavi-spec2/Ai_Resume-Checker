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
  
 const activeVersion =
    resume.versions.id(resume.currentVersionId) || resume.versions[0];

  if (!activeVersion || !activeVersion.rawText) {
    throw ApiError.badRequest("Selected resume version has no text content to analyze");
  }

  // Evaluate text with Gemini AI
  const aiResult = await analyzeResumeText(activeVersion.rawText, targetRole || "");


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

export const getUserAnalyses = asyncHandler(async (req, res) => {
  const analyses = await Analysis.find({ user: req.user._id })
    .populate("resume", "title")
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, { analyses }, "User analyses retrieved successfully")
  );
});

// GET /api/v1/analyses/:id
export const getAnalysisById = asyncHandler(async (req, res) => {
  const analysis = await Analysis.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate("resume", "title");

  if (!analysis) {
    throw ApiError.notFound("Analysis record not found");
  }

  return res.status(200).json(
    new ApiResponse(200, { analysis }, "Analysis record retrieved successfully")
  );
});

export const getResumeAnalyses = asyncHandler(async (req, res) => {
  const analyses = await Analysis.find({
    resume: req.params.resumeId,
    user: req.user._id,
  }).sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, { analyses }, "Resume analysis history retrieved successfully")
  );
});

// DELETE /api/v1/analyses/:id
export const deleteAnalysis = asyncHandler(async (req, res) => {
  const analysis = await Analysis.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!analysis) {
    throw ApiError.notFound("Analysis record not found");
  }

  return res.status(200).json(
    new ApiResponse(200, null, "Analysis record deleted successfully")
  );
});

// GET /api/v1/analyses/:id/export
  export const exportAnalysisReport = asyncHandler(async (req, res) => {
  const analysis = await Analysis.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate("resume", "title");

  if (!analysis) {
    throw ApiError.notFound("Analysis record not found");
  }

  const { format = "txt" } = req.query;

  if (format === "json") {
    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="analysis_${analysis._id}.json"`
    );
    return res.status(200).send(JSON.stringify(analysis, null, 2));
  }

//if report is in plain text
  const resumeTitle = analysis.resume?.title || "Resume";
  const reportText = `==================================================
ATS RESUME ANALYSIS REPORT
==================================================
Resume: ${resumeTitle}
Date: ${new Date(analysis.createdAt).toLocaleString()}
Target Role: ${analysis.targetRole || "General"}
ATS Score: ${analysis.score}/100

--------------------------------------------------
STRENGTHS:
--------------------------------------------------
${analysis.strengths.map((s) => `• ${s}`).join("\n")}

--------------------------------------------------
ISSUES / AREAS FOR IMPROVEMENT:
--------------------------------------------------
${analysis.issues.map((i) => `• ${i}`).join("\n")}

--------------------------------------------------
MISSING KEYWORDS:
--------------------------------------------------
${analysis.missingKeywords.map((k) => `• ${k}`).join("\n")}

--------------------------------------------------
SUGGESTED BULLET REWRITES:
--------------------------------------------------
${analysis.rewrites
  .map(
    (r, idx) =>
      `[Rewrite ${idx + 1}]\nOriginal:   ${r.original}\nSuggestion: ${r.suggestion}\n`
  )
  .join("\n")}
==================================================
`;

  res.setHeader("Content-Type", "text/plain");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="ATS_Analysis_${analysis._id}.txt"`
  );
  return res.status(200).send(reportText);
});