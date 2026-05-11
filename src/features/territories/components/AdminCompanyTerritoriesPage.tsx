"use client";

import Link from "next/link";
import { AddTerritoryForm } from "@/features/territories/components/AddTerritoryForm";
import { NationwideAccessToggle } from "@/features/territories/components/NationwideAccessToggle";
import { TerritoryList } from "@/features/territories/components/TerritoryList";
import { useAddTerritory, useAdminCompanyTerritories, useRemoveTerritory, useToggleNationwideAccess } from "@/features/territories/api/territories.queries";
import { getErrorMessage } from "@/shared/lib/error";
import { Button, Card, CardContent, CardHeader, CardTitle, ErrorState, LoadingState, PageHeader } from "@/shared/ui";

export function AdminCompanyTerritoriesPage({ companyId }: { companyId: string }) {
  const territoriesQuery = useAdminCompanyTerritories(companyId);
  const addMutation = useAddTerritory(companyId);
  const removeMutation = useRemoveTerritory(companyId);
  const nationwideMutation = useToggleNationwideAccess(companyId);
  const summary = territoriesQuery.data;

  return (
    <>
      <PageHeader
        title="Company territories"
        description="Manage state, county, ZIP, and nationwide access for this company."
        action={<Button variant="secondary"><Link href={`/companies/${companyId}`}>Back to company</Link></Button>}
      />
      <div className="space-y-4">
        {territoriesQuery.isLoading ? <LoadingState /> : null}
        {territoriesQuery.error ? <ErrorState error={territoriesQuery.error} /> : null}
        {summary ? (
          <>
            <Card>
              <CardHeader><CardTitle>Nationwide access</CardTitle></CardHeader>
              <CardContent>
                <NationwideAccessToggle
                  enabled={summary.hasNationwideAccess}
                  isSubmitting={nationwideMutation.isPending}
                  onToggle={(enabled) => nationwideMutation.mutate({ hasNationwideAccess: enabled })}
                />
                {nationwideMutation.error ? <p className="mt-3 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{getErrorMessage(nationwideMutation.error)}</p> : null}
                {nationwideMutation.isSuccess ? <p className="mt-3 rounded bg-emerald-50 px-3 py-2 text-sm text-emerald-800">Nationwide access updated.</p> : null}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Add territory</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <AddTerritoryForm onSubmit={(input) => addMutation.mutateAsync(input)} isSubmitting={addMutation.isPending} />
                {addMutation.error ? <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">{getErrorMessage(addMutation.error)}</p> : null}
                {addMutation.isSuccess ? <p className="rounded bg-emerald-50 px-3 py-2 text-sm text-emerald-800">Territory added.</p> : null}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Assigned territories</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <TerritoryList territories={summary.territories} isRemoving={removeMutation.isPending} onRemove={(territory) => removeMutation.mutate(territory.id)} />
                {removeMutation.error ? <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">{getErrorMessage(removeMutation.error)}</p> : null}
                {removeMutation.isSuccess ? <p className="rounded bg-emerald-50 px-3 py-2 text-sm text-emerald-800">Territory removed.</p> : null}
              </CardContent>
            </Card>
          </>
        ) : null}
      </div>
    </>
  );
}
