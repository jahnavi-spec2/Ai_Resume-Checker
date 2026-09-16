import {apiClient} from "./client";

// export const authApi = {
//   register: (payload) =>
//     apiClient.post("/auth/register", payload).then((response) => response.data),

//   login: (payload) =>
//     apiClient.post("/auth/login", payload).then((response) => response.data),

//   logout: () =>
//     apiClient.post("/auth/logout").then((response) => response.data),

//   me: () =>
//     apiClient.get("/auth/me").then((response) => response.data),
// };


export const loginApi = async (data) => {
  const res = await apiClient.post("/auth/login", data);
  return res.data;
};

export const registerApi = async (data) => {
  const res = await apiClient.post("/auth/register", data);
  return res.data;
};

export const getCurrentUserApi = async () => {
  const res = await apiClient.get("/auth/me");
  return res.data;
};

export const logoutApi = async () => {
  const res = await apiClient.post("/auth/logout");
  return res.data;
};