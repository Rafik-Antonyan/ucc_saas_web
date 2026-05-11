"use client";

import { useQuery } from "@tanstack/react-query";
import { activitiesApi } from "@/features/activities/api/activities.api";
import type { ActivityListQuery } from "@/features/activities/types/activities.types";

export const activitiesQueryKeys = {
  all: ["activities"] as const,
  list: (query?: ActivityListQuery) => ["activities", "list", query ?? {}] as const
};

export function useActivitiesQuery(query?: ActivityListQuery) {
  return useQuery({ queryKey: activitiesQueryKeys.list(query), queryFn: () => activitiesApi.list(query), enabled: Boolean(query?.uccRecordId) });
}
