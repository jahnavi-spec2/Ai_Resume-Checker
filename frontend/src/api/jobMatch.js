import { apiClient } from "./client";

export const analyzeJobMatch = async (data) => {
  // data: { resumeId, versionId (optional), jobTitle, jobDescription }
  const res = await apiClient.post("/job-matching/analyze", data);
  return res.data;
};

export const getUserJobMatches = async () => {
  const res = await apiClient.get("/job-matching");
  return res.data;
};

export const getJobMatchById = async (id) => {
  const res = await apiClient.get(`/job-matching/${id}`);
  return res.data;
};

export const deleteJobMatch = async (id) => {
  const res = await apiClient.delete(`/job-matching/${id}`);
  return res.data;
};
