import { apiClient } from "./client";

export const analysisApi = {
  // Analyze a resume text with optional target role
  analyze: (resumeId, targetRole = "") =>
    apiClient
      .post(`/resumes/${resumeId}/analyze`, { targetRole })
      .then((res) => res.data),
};
