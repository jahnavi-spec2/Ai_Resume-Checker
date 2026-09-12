import Resume from "../models/resume.model.js";
import Analysis from "../models/analysis.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// GET /api/v1/dashboard/stats

export const getDashboardStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Get total resume count
  const totalResumes = await Resume.countDocuments({ user: userId });

  //. fetch all user analyses for stats calculation
  const analyses = await Analysis.find({ user: userId })
    .populate("resume", "title")
    .sort({ createdAt: -1 });

  const totalAnalyses = analyses.length;

  //  average ATS score and highest ATS score
  let averageScore = 0;
  let highestScore = 0;

  if (totalAnalyses > 0) {
    const totalScoreSum = analyses.reduce((acc, curr) => acc + curr.score, 0);
    averageScore = Math.round((totalScoreSum / totalAnalyses) * 10) / 10; // e.g. 78.5

    highestScore = Math.max(...analyses.map((a) => a.score));
  }

  // 4. Get recent resumes (top 3)
  const recentResumes = await Resume.find({ user: userId })
    .sort({ updatedAt: -1 })
    .limit(3);

  
  const recentAnalysis = totalAnalyses > 0 ? analyses[0] : null;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        stats: {
          totalResumes,
          totalAnalyses,
          averageScore,
          highestScore,
          recentAnalysis,
          recentResumes,
        },
      },
      "Dashboard statistics fetched successfully"
    )
  );
});
