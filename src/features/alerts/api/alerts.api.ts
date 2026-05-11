import { api } from "@/shared/api/client";
import { endpoints } from "@/shared/api/endpoints";
import type { AlertSummary } from "@/features/alerts/types/alerts.types";

export const alertsApi = {
  summary: () => api.get<AlertSummary>(endpoints.alerts.summary)
};
