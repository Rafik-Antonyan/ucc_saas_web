"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { canAccessRoute } from "@/shared/lib/rbac";
import { LoadingState, ErrorState } from "@/shared/ui";

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, hasToken, isLoading, error } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!hasToken) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (user && !user.disclaimerAccepted && pathname !== "/disclaimer") {
      router.replace("/disclaimer");
      return;
    }

    if (user && user.disclaimerAccepted && pathname === "/disclaimer") {
      router.replace("/dashboard");
      return;
    }

    if (user && !canAccessRoute(user, pathname)) {
      router.replace("/dashboard");
    }
  }, [hasToken, isLoading, pathname, router, user]);

  if (isLoading) return <LoadingState label="Checking your session..." />;
  if (error && !user) return <ErrorState error={error} />;
  if (!user) return <LoadingState label="Redirecting..." />;
  if (!user.disclaimerAccepted && pathname !== "/disclaimer") return <LoadingState label="Opening disclaimer..." />;
  if (user.disclaimerAccepted && pathname === "/disclaimer") return <LoadingState label="Opening dashboard..." />;
  if (!canAccessRoute(user, pathname)) return <LoadingState label="Checking access..." />;

  return children;
}
