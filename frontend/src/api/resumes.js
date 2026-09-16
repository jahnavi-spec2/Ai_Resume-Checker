import { apiClient } from "./client";

export const uploadResume = (formData) =>
  apiClient
    .post("/resumes/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);

export const getUserResumes = () =>
  apiClient.get("/resumes").then((res) => res.data);

export const getResumeById = (id) =>
  apiClient.get(`/resumes/${id}`).then((res) => res.data);

export const deleteResume = (id) =>
  apiClient.delete(`/resumes/${id}`).then((res) => res.data);

export const addResumeVersion = (id, payload) =>
  apiClient.post(`/resumes/${id}/versions`, payload).then((res) => res.data);

export const setCurrentVersion = (id, versionId) =>
  apiClient.patch(`/resumes/${id}/current-version`, { versionId }).then((res) => res.data);

export const resumeApi = {
  upload: uploadResume,
  getAll: getUserResumes,
  getById: getResumeById,
  delete: deleteResume,
  addVersion: addResumeVersion,
  setCurrentVersion,
};

