import { apiClient } from "./client";

export const getDashboardStatsApi = async () => {
  const res = await apiClient.get("/dashboard/stats");
  return res.data;
};
