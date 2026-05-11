"use client";

import Link from "next/link";
import { useTerritoriesQuery } from "@/features/territories/api/territories.queries";
import type { Territory } from "@/features/territories/types/territories.types";
import { Badge, DataTable, type DataTableColumn, ErrorState, LoadingState, PageHeader } from "@/shared/ui";

export function TerritoriesList() {
  const territoriesQuery = useTerritoriesQuery();
  const columns: DataTableColumn<Territory>[] = [
    { key: "type", header: "Type", render: (territory) => <Badge tone="info">{territory.type}</Badge> },
    { key: "value", header: "Value", render: (territory) => territory.value },
    { key: "label", header: "Label", render: (territory) => territory.label || "-" },
    {
      key: "company",
      header: "Company",
      render: (territory) => territory.companyId ? (
        <Link className="font-medium text-primary" href={`/admin/companies/${territory.companyId}/territories`}>Manage company</Link>
      ) : "-"
    }
  ];

  return (
    <>
      <PageHeader title="Territories" description="State, county, and zip access scopes for tenants." />
      {territoriesQuery.isLoading ? <LoadingState /> : null}
      {territoriesQuery.error ? <ErrorState error={territoriesQuery.error} /> : null}
      {territoriesQuery.data ? <DataTable data={territoriesQuery.data} columns={columns} emptyTitle="No territories found" /> : null}
    </>
  );
}
