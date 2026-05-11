import { api } from "@/shared/api/client";
import { endpoints } from "@/shared/api/endpoints";

export type HealthStatus = {
  status: string;
  uptime?: number;
  timestamp?: string;
};

export const healthApi = {
  get: () => api.get<HealthStatus>(endpoints.health.base)
};
