"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { authApi } from "@/features/auth/api/auth.api";
import { AUTH_QUERY_KEYS } from "@/features/auth/constants";
import type { LoginInput } from "@/features/auth/types/auth.types";
import { clearAccessToken, getAccessToken, getStoredUser, setAccessToken, setStoredUser } from "@/shared/lib/auth-storage";

export function useMeQuery() {
  const queryClient = useQueryClient();
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    const storedUser = getStoredUser();
    if (token && storedUser) {
      queryClient.setQueryData(AUTH_QUERY_KEYS.me, storedUser);
    }
    setHasToken(Boolean(token));
  }, [queryClient]);

  const query = useQuery({
    queryKey: AUTH_QUERY_KEYS.me,
    queryFn: authApi.me,
    enabled: hasToken === true,
    initialData: () => (getAccessToken() ? getStoredUser() ?? undefined : undefined),
    retry: false
  });

  useEffect(() => {
    if (query.data) {
      setStoredUser(query.data);
    }
  }, [query.data]);

  return {
    ...query,
    hasToken: hasToken === true,
    isCheckingToken: hasToken === null
  };
}

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: LoginInput) => authApi.login(input),
    onSuccess: (session) => {
      setAccessToken(session.accessToken);
      setStoredUser(session.user);
      queryClient.setQueryData(AUTH_QUERY_KEYS.me, session.user);
    }
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        await authApi.logout();
      } catch {
        // The current backend does not expose logout yet; local logout still applies.
      }
    },
    onSettled: () => {
      clearAccessToken();
      queryClient.removeQueries();
    }
  });
}

export function useAcceptDisclaimerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.acceptDisclaimer,
    onSuccess: (user) => {
      setStoredUser(user);
      queryClient.setQueryData(AUTH_QUERY_KEYS.me, user);
      void queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.me });
    }
  });
}
