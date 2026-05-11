"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useMeQuery } from "@/features/auth/api/auth.queries";
import { getAccessToken } from "@/shared/lib/auth-storage";
import { LoadingState } from "@/shared/ui";

export function AuthRedirect({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const meQuery = useMeQuery();

  useEffect(() => {
    if (!getAccessToken()) return;
    if (!meQuery.data) return;

    const next = searchParams.get("next");
    router.replace(meQuery.data.disclaimerAccepted ? next || "/dashboard" : "/disclaimer");
  }, [meQuery.data, router, searchParams]);

  if (getAccessToken() && meQuery.isLoading) {
    return <LoadingState label="Checking your session..." />;
  }

  return children;
}
