import Resume from "../models/resume.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { extractTextFromPdf } from "../utils/pdfParser.js";


export const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw ApiError.badRequest("Please upload a PDF file");
  }

  const rawText = await extractTextFromPdf(req.file.buffer);

  if (!rawText || rawText.trim().length === 0) {
    throw ApiError.badRequest(
      "Could not extract readable text from PDF. Please ensure the PDF contains searchable text."
    );
  }

  const title = req.body.title || req.file.originalname.replace(/\.pdf$/i, "") || "My Resume";

  const initialVersion = {
    label: "Original Upload",
    sourceType: "upload",
    rawText: rawText.trim(),
  };

  const resume = new Resume({
    user: req.user._id,
    title,
    versions: [initialVersion],
  });

  // Set the current version to the initial uploaded version
  resume.currentVersionId = resume.versions[0]._id;
  await resume.save();

  return res.status(201).json(
    new ApiResponse(201, { resume }, "Resume uploaded and extracted successfully")
  );
});


export const getUserResumes = asyncHandler(async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id }).sort({ updatedAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, { resumes }, "User resumes fetched successfully")
  );
});

// GET /api/v1/resumes/:id
export const getResumeById = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!resume) {
    throw ApiError.notFound("Resume not found");
  }

  return res.status(200).json(
    new ApiResponse(200, { resume }, "Resume fetched successfully")
  );
});

// DELETE /api/v1/resumes/:id
export const deleteResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!resume) {
    throw ApiError.notFound("Resume not found");
  }

  return res.status(200).json(
    new ApiResponse(200, {}, "Resume deleted successfully")
  );
});

// POST /api/v1/resumes/:id/versions
export const addResumeVersion = asyncHandler(async (req, res) => {
  const { label, rawText, sourceType = "rewrite", setAsCurrent = true } = req.body;

  if (!label || !rawText) {
    throw ApiError.badRequest("Label and rawText are required to create a new version");
  }

  const resume = await Resume.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!resume) {
    throw ApiError.notFound("Resume not found");
  }

  const newVersion = {
    label: label.trim(),
    sourceType: sourceType === "upload" ? "upload" : "rewrite",
    rawText: rawText.trim(),
  };

  resume.versions.push(newVersion);
  const createdVersion = resume.versions[resume.versions.length - 1];

  if (setAsCurrent) {
    resume.currentVersionId = createdVersion._id;
  }

  await resume.save();

  return res.status(201).json(
    new ApiResponse(
      201,
      { resume, newVersion: createdVersion },
      "New resume version created successfully"
    )
  );
});

// PATCH /api/v1/resumes/:id/current-version
export const setCurrentVersion = asyncHandler(async (req, res) => {
  const { versionId } = req.body;

  if (!versionId) {
    throw ApiError.badRequest("versionId is required");
  }

  const resume = await Resume.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!resume) {
    throw ApiError.notFound("Resume not found");
  }

  const targetVersion = resume.versions.id(versionId);
  if (!targetVersion) {
    throw ApiError.notFound("Version not found in this resume");
  }

  resume.currentVersionId = targetVersion._id;
  await resume.save();

  return res.status(200).json(
    new ApiResponse(200, { resume }, "Active version updated successfully")
  );
});

// GET /api/v1/resumes/:id/versions
export const getResumeVersions = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!resume) {
    throw ApiError.notFound("Resume not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        versions: resume.versions,
        currentVersionId: resume.currentVersionId,
      },
      "Resume versions fetched successfully"
    )
  );
});

// GET /api/v1/resumes/:id/export
export const exportResumeText = asyncHandler(async (req, res) => {
  const { versionId } = req.query;
  const resume = await Resume.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!resume) {
    throw ApiError.notFound("Resume not found");
  }

  const version = versionId
    ? resume.versions.id(versionId)
    : resume.versions.id(resume.currentVersionId) || resume.versions[0];

  if (!version) {
    throw ApiError.notFound("Requested resume version not found");
  }

  const sanitizedTitle = resume.title.replace(/[^a-zA-Z0-9_-]/g, "_");
  const filename = `${sanitizedTitle}_${version.label.replace(/\s+/g, "_")}.txt`;

  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  return res.status(200).send(version.rawText);
});

