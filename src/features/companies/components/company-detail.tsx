"use client";

import Link from "next/link";
import { useCompanyQuery } from "@/features/companies/api/companies.queries";
import { Badge, Button, Card, CardContent, ErrorState, LoadingState, PageHeader } from "@/shared/ui";

export function CompanyDetail({ id }: { id: string }) {
  const companyQuery = useCompanyQuery(id);

  if (companyQuery.isLoading) return <LoadingState />;
  if (companyQuery.error) return <ErrorState error={companyQuery.error} />;
  if (!companyQuery.data) return null;

  const company = companyQuery.data;

  return (
    <>
      <PageHeader
        title={company.name}
        description="Company profile and tenant settings."
        action={(
          <div className="flex gap-2">
            <Button variant="secondary"><Link href={`/admin/companies/${company.id}/territories`}>Territories</Link></Button>
            <Button variant="secondary"><Link href={`/companies/${company.id}/edit`}>Edit</Link></Button>
          </div>
        )}
      />
      <Card>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div><p className="text-xs uppercase text-slate-500">Email</p><p className="text-sm">{company.email || "-"}</p></div>
          <div><p className="text-xs uppercase text-slate-500">Phone</p><p className="text-sm">{company.phone || "-"}</p></div>
          <div><p className="text-xs uppercase text-slate-500">Status</p><Badge tone={company.isActive ? "success" : "danger"}>{company.isActive ? "Active" : "Inactive"}</Badge></div>
          <div><p className="text-xs uppercase text-slate-500">Access</p><Badge tone={company.hasNationwideAccess ? "success" : "default"}>{company.hasNationwideAccess ? "Nationwide" : "Territory scoped"}</Badge></div>
        </CardContent>
      </Card>
    </>
  );
}
