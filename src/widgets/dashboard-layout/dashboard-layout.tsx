"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { AuthGuard } from "@/features/auth/components/auth-guard";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Header } from "@/widgets/header/header";
import { Sidebar } from "@/widgets/sidebar/sidebar";
import { LoadingState } from "@/shared/ui";

function DashboardFrame({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  if (!user) return <LoadingState />;

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar user={user} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="min-w-0 flex-1">
        <Header user={user} onMenu={() => setSidebarOpen(true)} onLogout={logout} />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-6">{children}</main>
      </div>
    </div>
  );
}

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <DashboardFrame>{children}</DashboardFrame>
    </AuthGuard>
  );
}
