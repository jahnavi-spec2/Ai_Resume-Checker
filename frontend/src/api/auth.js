import { apiClient } from "./client";

export const authApi = {
  register: (payload) =>
    apiClient.post("/auth/register", payload).then((response) => response.data),

  login: (payload) =>
    apiClient.post("/auth/login", payload).then((response) => response.data),

  logout: () =>
    apiClient.post("/auth/logout").then((response) => response.data),

  me: () =>
    apiClient.get("/auth/me").then((response) => response.data),
};