import { apiClient } from "./client";

export const resumeApi = {
  // Upload a resume PDF
  upload: (formData) =>
    apiClient
      .post("/resumes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data),

  // Get all user resumes
  getAll: () =>
    apiClient.get("/resumes").then((res) => res.data),

  // Get single resume by ID
  getById: (id) =>
    apiClient.get(`/resumes/${id}`).then((res) => res.data),

  // Delete resume by ID
  delete: (id) =>
    apiClient.delete(`/resumes/${id}`).then((res) => res.data),

  // Add new version to a resume
  addVersion: (id, payload) =>
    apiClient.post(`/resumes/${id}/versions`, payload).then((res) => res.data),

  // Set active current version of a resume
  setCurrentVersion: (id, versionId) =>
    apiClient.patch(`/resumes/${id}/current-version`, { versionId }).then((res) => res.data),

  // Get all versions of a resume
  getVersions: (id) =>
    apiClient.get(`/resumes/${id}/versions`).then((res) => res.data),
};
