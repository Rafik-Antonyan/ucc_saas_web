"use client";

import { TerritoryBadge } from "@/features/territories/components/TerritoryBadge";
import { useCompanyTerritories } from "@/features/territories/api/territories.queries";
import { Card, CardContent, CardHeader, CardTitle, EmptyState, ErrorState, LoadingState } from "@/shared/ui";

export function TerritorySummary() {
  const territoriesQuery = useCompanyTerritories();
  const territories = territoriesQuery.data?.territories ?? [];

  return (
    <Card>
      <CardHeader><CardTitle>Territory access</CardTitle></CardHeader>
      <CardContent>
        {territoriesQuery.isLoading ? <LoadingState /> : null}
        {territoriesQuery.error ? <ErrorState error={territoriesQuery.error} /> : null}
        {territoriesQuery.data?.hasNationwideAccess ? (
          <div className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">Your company has nationwide access.</div>
        ) : territories.length ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-slate-600">Your company has access to:</span>
            {territories.map((territory) => <TerritoryBadge key={territory.id} territory={territory} />)}
          </div>
        ) : !territoriesQuery.isLoading ? <EmptyState title="No territories are assigned to your company yet." /> : null}
      </CardContent>
    </Card>
  );
}
