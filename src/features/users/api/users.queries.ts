"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/features/users/api/users.api";
import type { UpdateUserInput, UserListQuery } from "@/features/users/types/users.types";

export const usersQueryKeys = {
  all: ["users"] as const,
  list: (query?: UserListQuery) => ["users", "list", query ?? {}] as const,
  detail: (id: string) => ["users", "detail", id] as const
};

export function useUsersQuery(query?: UserListQuery) {
  return useQuery({ queryKey: usersQueryKeys.list(query), queryFn: () => usersApi.list(query) });
}

export function useUserQuery(id: string) {
  return useQuery({ queryKey: usersQueryKeys.detail(id), queryFn: () => usersApi.getById(id), enabled: Boolean(id) });
}

export function useUpdateUserMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateUserInput) => usersApi.update(id, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: usersQueryKeys.all });
      void queryClient.invalidateQueries({ queryKey: usersQueryKeys.detail(id) });
    }
  });
}

export function useDeactivateUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => usersApi.deactivate(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: usersQueryKeys.all })
  });
}
