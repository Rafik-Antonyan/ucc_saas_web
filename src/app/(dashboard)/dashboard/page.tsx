"use client";

import Link from "next/link";
import { Building2, CalendarClock, FileText, ShieldPlus, Users } from "lucide-react";
import { useAlertSummaryQuery } from "@/features/alerts/api/alerts.queries";
import { useCompaniesQuery } from "@/features/companies/api/companies.queries";
import { useFollowupsQuery } from "@/features/followups/api/followups.queries";
import { useUccRecordsQuery } from "@/features/ucc/api/ucc.queries";
import { useUsersQuery } from "@/features/users/api/users.queries";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { NAV_ITEMS } from "@/shared/constants/routes";
import { hasRole } from "@/shared/lib/rbac";
import { UserRole } from "@/shared/types/auth";
import { Card, CardContent, PageHeader } from "@/shared/ui";

function StatCard({ label, value, href, icon: Icon }: { label: string; value: number | string; href: string; icon: typeof FileText }) {
  return (
    <Link href={href}>
      <Card className="transition hover:border-primary">
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-1 text-2xl font-semibold">{value}</p>
          </div>
          <Icon className="h-6 w-6 text-primary" />
        </CardContent>
      </Card>
    </Link>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const companies = useCompaniesQuery();
  const users = useUsersQuery();
  const ucc = useUccRecordsQuery();
  const followups = useFollowupsQuery();
  const alerts = useAlertSummaryQuery();
  const uccHref = user?.role === UserRole.SUPER_ADMIN ? "/admin/ucc" : "/company/leads";
  const uccCount = Array.isArray(ucc.data) ? ucc.data.length : ucc.data?.meta?.total ?? ucc.data?.data?.length ?? "-";
  const canSee = (key: string) => {
    const navItem = NAV_ITEMS.find((item) => item.key === key);
    return Boolean(user && navItem && hasRole(user, navItem.roles));
  };

  return (
    <>
      <PageHeader title="Dashboard" description="Operational overview for your current role and tenant scope." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {canSee("companies") ? <StatCard label="Companies" value={companies.data?.length ?? "-"} href="/companies" icon={Building2} /> : null}
        {canSee("users") ? <StatCard label="Users" value={users.data?.length ?? "-"} href="/users" icon={Users} /> : null}
        {canSee(user?.role === UserRole.SUPER_ADMIN ? "admin" : "company") ? <StatCard label="UCC records" value={uccCount} href={uccHref} icon={FileText} /> : null}
        {canSee("followups") ? <StatCard label="Followups" value={followups.data?.length ?? "-"} href="/followups" icon={CalendarClock} /> : null}
        {canSee("alerts") ? <StatCard label="Overdue alerts" value={alerts.data?.overdueFollowUps ?? "-"} href="/alerts" icon={ShieldPlus} /> : null}
      </div>
    </>
  );
}
