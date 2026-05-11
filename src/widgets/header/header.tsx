"use client";

import { LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import type { CurrentUser } from "@/shared/types/auth";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";

export function Header({ user, onMenu, onLogout }: { user: CurrentUser; onMenu: () => void; onLogout: () => Promise<void> }) {
  const router = useRouter();
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email;

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <Button aria-label="Open navigation" className="h-9 w-9 p-0 lg:hidden" variant="ghost" onClick={onMenu}>
          <Menu className="h-4 w-4" />
        </Button>
        <div>
          <p className="text-sm font-medium text-slate-950">{name}</p>
          <p className="text-xs text-slate-500">{user.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge tone="info">{user.role.replace("_", " ")}</Badge>
        <Button
          aria-label="Sign out"
          className="h-9 w-9 p-0"
          variant="ghost"
          onClick={async () => {
            await onLogout();
            router.replace("/login");
          }}
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
