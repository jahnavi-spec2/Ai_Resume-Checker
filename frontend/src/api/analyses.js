import { apiClient } from "./client";

export const analyzeResumeApi = async (resumeId, targetRole) => {
  const res = await apiClient.post(`/resumes/${resumeId}/analyze`, { targetRole });
  return res.data;
};

export const getUserAnalysesApi = async () => {
  const res = await apiClient.get("/analyses");
  return res.data;
};

export const deleteAnalysisApi = async (id) => {
  const res = await apiClient.delete(`/analyses/${id}`);
  return res.data;
};

export const exportAnalysisReportApi = async (id, format = "txt") => {
  const res = await apiClient.get(`/analyses/${id}/export?format=${format}`, {
    responseType: "blob",
  });
  return res;
};
