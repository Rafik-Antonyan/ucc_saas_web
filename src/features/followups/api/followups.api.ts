import { api } from "@/shared/api/client";
import { endpoints } from "@/shared/api/endpoints";
import type { Followup, FollowupFormInput, FollowupListQuery } from "@/features/followups/types/followups.types";

export const followupsApi = {
  list: (params?: FollowupListQuery) => api.get<Followup[]>(endpoints.followups.base, { params }),
  create: (input: FollowupFormInput) => api.post<Followup, FollowupFormInput>(endpoints.followups.base, input),
  update: (id: string, input: Partial<FollowupFormInput>) => api.patch<Followup, Partial<FollowupFormInput>>(endpoints.followups.byId(id), input)
};
