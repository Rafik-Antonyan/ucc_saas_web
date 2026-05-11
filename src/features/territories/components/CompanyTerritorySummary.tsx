"use client";

import { TerritoryList } from "@/features/territories/components/TerritoryList";
import type { TerritorySummary } from "@/features/territories/types/territories.types";
import { Badge, Card, CardContent, CardHeader, CardTitle, EmptyState } from "@/shared/ui";

export function CompanyTerritorySummary({ summary }: { summary: TerritorySummary }) {
  return (
    <Card>
      <CardHeader><CardTitle>Assigned territories</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {summary.hasNationwideAccess ? (
          <div className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">Your company has nationwide access.</div>
        ) : (
          <Badge>Territory scoped</Badge>
        )}
        {summary.territories.length ? (
          <TerritoryList territories={summary.territories} />
        ) : (
          <EmptyState title="No territories are assigned to your company yet." />
        )}
      </CardContent>
    </Card>
  );
}
