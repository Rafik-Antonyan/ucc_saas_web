"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { NAV_ITEMS } from "@/shared/constants/routes";
import { hasRole } from "@/shared/lib/rbac";
import type { CurrentUser } from "@/shared/types/auth";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/utils/cn";

export function Sidebar({ user, open, onClose }: { user: CurrentUser; open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const items = NAV_ITEMS.filter((item) => hasRole(user, item.roles));

  return (
    <>
      <div className={cn("fixed inset-0 z-30 bg-slate-950/30 lg:hidden", open ? "block" : "hidden")} onClick={onClose} />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <Link className="text-base font-semibold text-slate-950" href="/dashboard">
            UCC SaaS
          </Link>
          <Button aria-label="Close navigation" className="h-9 w-9 p-0 lg:hidden" variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex min-h-10 items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100",
                  active && "bg-emerald-50 text-primary"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
