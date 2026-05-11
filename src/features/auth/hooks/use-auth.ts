"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLogoutMutation, useMeQuery } from "@/features/auth/api/auth.queries";
import { clearAccessToken } from "@/shared/lib/auth-storage";

export function useAuth() {
  const meQuery = useMeQuery();
  const logoutMutation = useLogoutMutation();
  const router = useRouter();

  useEffect(() => {
    const handleLogout = () => {
      clearAccessToken();
      router.replace("/login");
    };

    window.addEventListener("ucc-auth-logout", handleLogout);
    return () => window.removeEventListener("ucc-auth-logout", handleLogout);
  }, [router]);

  return {
    user: meQuery.data,
    hasToken: meQuery.hasToken,
    isLoading: meQuery.isCheckingToken || (meQuery.hasToken && !meQuery.data && (meQuery.isLoading || meQuery.isFetching)),
    isAuthenticated: Boolean(meQuery.data),
    error: meQuery.error,
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
    refetchUser: meQuery.refetch
  };
}
