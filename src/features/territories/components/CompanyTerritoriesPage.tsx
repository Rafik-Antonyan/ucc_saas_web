"use client";

import { CompanyTerritorySummary } from "@/features/territories/components/CompanyTerritorySummary";
import { useCompanyTerritories } from "@/features/territories/api/territories.queries";
import { ErrorState, LoadingState, PageHeader } from "@/shared/ui";

export function CompanyTerritoriesPage() {
  const territoriesQuery = useCompanyTerritories();

  return (
    <>
      <PageHeader title="Company territories" description="Read-only access scope for your company." />
      {territoriesQuery.isLoading ? <LoadingState /> : null}
      {territoriesQuery.error ? <ErrorState error={territoriesQuery.error} /> : null}
      {territoriesQuery.data ? <CompanyTerritorySummary summary={territoriesQuery.data} /> : null}
    </>
  );
}
