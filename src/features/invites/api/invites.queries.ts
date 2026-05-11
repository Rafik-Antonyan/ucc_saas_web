"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { invitesApi } from "@/features/invites/api/invites.api";
import type { AcceptInviteInput, CreateInviteInput, InviteListQuery } from "@/features/invites/types/invites.types";
import { setAccessToken } from "@/shared/lib/auth-storage";
import { AUTH_QUERY_KEYS } from "@/features/auth/constants";

export const invitesQueryKeys = {
  all: ["invites"] as const,
  list: (query?: InviteListQuery) => ["invites", "list", query ?? {}] as const,
  public: (token: string) => ["invites", "public", token] as const
};

export function useInvitesQuery(query?: InviteListQuery) {
  return useQuery({ queryKey: invitesQueryKeys.list(query), queryFn: () => invitesApi.list(query) });
}

export function useCreateInviteMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateInviteInput) => invitesApi.create(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: invitesQueryKeys.all })
  });
}

export function usePublicInviteQuery(token: string) {
  return useQuery({ queryKey: invitesQueryKeys.public(token), queryFn: () => invitesApi.getPublicInvite(token), enabled: token.length >= 32, retry: false });
}

export function useAcceptInviteMutation(token: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: AcceptInviteInput) => invitesApi.accept(token, input),
    onSuccess: (session) => {
      setAccessToken(session.accessToken);
      queryClient.setQueryData(AUTH_QUERY_KEYS.me, session.user);
    }
  });
}
