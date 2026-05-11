"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { followupsApi } from "@/features/followups/api/followups.api";
import type { FollowupFormInput, FollowupListQuery } from "@/features/followups/types/followups.types";

export const followupsQueryKeys = {
  all: ["followups"] as const,
  list: (query?: FollowupListQuery) => ["followups", "list", query ?? {}] as const
};

export function useFollowupsQuery(query?: FollowupListQuery) {
  return useQuery({ queryKey: followupsQueryKeys.list(query), queryFn: () => followupsApi.list(query) });
}

export function useCreateFollowupMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: FollowupFormInput) => followupsApi.create(input),
    onSuccess: (_followup, input) => {
      queryClient.invalidateQueries({ queryKey: followupsQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      if (input.uccRecordId) queryClient.invalidateQueries({ queryKey: followupsQueryKeys.list({ uccRecordId: input.uccRecordId }) });
    }
  });
}

export function useUpdateFollowupMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<FollowupFormInput> }) => followupsApi.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: followupsQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    }
  });
}
