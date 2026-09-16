import Resume from "../models/resume.model.js";
import JobMatch from "../models/jobMatch.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { matchResumeWithJob } from "../services/ai.services.js";

// POST /api/v1/job-matching/analyze
export const analyzeJobMatch = asyncHandler(async (req, res) => {
  const { resumeId, versionId, jobTitle, jobDescription } = req.body;

  if (!resumeId) {
    throw ApiError.badRequest("resumeId is required");
  }

  if (!jobDescription || jobDescription.trim().length === 0) {
    throw ApiError.badRequest("jobDescription is required for matching");
  }

  const resume = await Resume.findOne({
    _id: resumeId,
    user: req.user._id,
  });

  if (!resume) {
    throw ApiError.notFound("Resume not found");
  }

  // Determine target active version text
  const targetVersion = versionId
    ? resume.versions.id(versionId)
    : resume.versions.id(resume.currentVersionId) || resume.versions[0];

  if (!targetVersion || !targetVersion.rawText) {
    throw ApiError.badRequest("Selected resume version has no text content to analyze");
  }

  // Run AI matching
  const aiResult = await matchResumeWithJob(
    targetVersion.rawText,
    jobTitle || "",
    jobDescription
  );

  const jobMatch = await JobMatch.create({
    user: req.user._id,
    resume: resume._id,
    version: targetVersion._id,
    jobTitle: jobTitle || "Target Position",
    jobDescription: jobDescription.trim(),
    matchScore: aiResult.matchScore,
    matchingSkills: aiResult.matchingSkills,
    missingSkills: aiResult.missingSkills,
    missingKeywords: aiResult.missingKeywords,
    experienceGaps: aiResult.experienceGaps,
    suggestions: aiResult.suggestions,
  });

  return res.status(201).json(
    new ApiResponse(201, { jobMatch }, "Job matching analysis completed successfully")
  );
});

// GET /api/v1/job-matching
export const getUserJobMatches = asyncHandler(async (req, res) => {
  const jobMatches = await JobMatch.find({ user: req.user._id })
    .populate("resume", "title")
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, { jobMatches }, "Job matches retrieved successfully")
  );
});

// GET /api/v1/job-matching/:id
export const getJobMatchById = asyncHandler(async (req, res) => {
  const jobMatch = await JobMatch.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate("resume", "title");

  if (!jobMatch) {
    throw ApiError.notFound("Job match record not found");
  }

  return res.status(200).json(
    new ApiResponse(200, { jobMatch }, "Job match details retrieved successfully")
  );
});

// DELETE /api/v1/job-matching/:id
export const deleteJobMatch = asyncHandler(async (req, res) => {
  const jobMatch = await JobMatch.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!jobMatch) {
    throw ApiError.notFound("Job match record not found");
  }

  return res.status(200).json(
    new ApiResponse(200, null, "Job match record deleted successfully")
  );
});