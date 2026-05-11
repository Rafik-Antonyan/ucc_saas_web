"use client";

import { AlertTriangle } from "lucide-react";
import { useAlertSummaryQuery } from "@/features/alerts/api/alerts.queries";
import { Card, CardContent, ErrorState, LoadingState, PageHeader } from "@/shared/ui";

export function AlertsPage() {
  const alertsQuery = useAlertSummaryQuery();

  return (
    <>
      <PageHeader title="Alerts" description="Operational alerts for overdue work." />
      {alertsQuery.isLoading ? <LoadingState /> : null}
      {alertsQuery.error ? <ErrorState error={alertsQuery.error} /> : null}
      {alertsQuery.data ? (
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-amber-100 text-amber-700">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{alertsQuery.data.overdueFollowUps}</p>
              <p className="text-sm text-slate-500">Overdue followups</p>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </>
  );
}
