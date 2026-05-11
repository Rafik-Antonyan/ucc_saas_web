"use client";

import { useQuery } from "@tanstack/react-query";
import { alertsApi } from "@/features/alerts/api/alerts.api";

export const alertsQueryKeys = {
  summary: ["alerts", "summary"] as const
};

export function useAlertSummaryQuery() {
  return useQuery({ queryKey: alertsQueryKeys.summary, queryFn: alertsApi.summary });
}
