"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { hasRole } from "@/shared/lib/rbac";
import type { UserRole } from "@/shared/types/auth";
import { ErrorState, LoadingState } from "@/shared/ui";

export function RoleGuard({ roles, children }: { roles: UserRole[]; children: ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <LoadingState />;
  if (!hasRole(user, roles)) return <ErrorState error={{ message: "You do not have access to this page." }} />;

  return children;
}
