import { api } from "@/shared/api/client";
import { endpoints } from "@/shared/api/endpoints";
import type { ActivityListQuery, LeadActivity } from "@/features/activities/types/activities.types";

export const activitiesApi = {
  list: (params?: ActivityListQuery) => api.get<LeadActivity[]>(endpoints.activities.base, { params })
};
