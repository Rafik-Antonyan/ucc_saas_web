"use client";

import Link from "next/link";
import { Map, Plus } from "lucide-react";
import { useCompaniesQuery } from "@/features/companies/api/companies.queries";
import type { Company } from "@/features/companies/types/companies.types";
import { Badge, DataTable, type DataTableColumn, ErrorState, LoadingState, PageHeader } from "@/shared/ui";

export function CompaniesList() {
  const companiesQuery = useCompaniesQuery();

  const columns: DataTableColumn<Company>[] = [
    { key: "name", header: "Name", render: (company) => <Link className="font-medium text-primary" href={`/companies/${company.id}`}>{company.name}</Link> },
    { key: "email", header: "Email", render: (company) => company.email || "-" },
    { key: "nationwide", header: "Territory", render: (company) => (company.hasNationwideAccess ? <Badge tone="success">Nationwide</Badge> : <Badge>Scoped</Badge>) },
    { key: "status", header: "Status", render: (company) => <Badge tone={company.isActive ? "success" : "danger"}>{company.isActive ? "Active" : "Inactive"}</Badge> },
    {
      key: "actions",
      header: "Actions",
      className: "w-[160px]",
      render: (company) => (
        <Link className="inline-flex min-h-9 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-900 hover:bg-slate-50" href={`/admin/companies/${company.id}/territories`}>
          <Map className="h-4 w-4" />
          Territories
        </Link>
      )
    }
  ];

  return (
    <>
      <PageHeader
        title="Companies"
        description="Super admin tenant management."
        action={
          <Link className="inline-flex min-h-10 items-center px-4 py-2 gap-2 rounded-md bg-primary text-sm font-medium text-white hover:bg-emerald-800" href="/companies/create">
            <Plus className="h-4 w-4" />
            New company
          </Link>
        }
      />
      {companiesQuery.isLoading ? <LoadingState /> : null}
      {companiesQuery.error ? <ErrorState error={companiesQuery.error} /> : null}
      {companiesQuery.data ? <DataTable data={companiesQuery.data} columns={columns} emptyTitle="No companies yet" /> : null}
    </>
  );
}
