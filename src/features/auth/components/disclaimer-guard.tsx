"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { LoadingState } from "@/shared/ui";

export function DisclaimerGuard({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading || !user) return <LoadingState />;
  if (!user.disclaimerAccepted) return <LoadingState label="Opening disclaimer..." />;

  return children;
}
