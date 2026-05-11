import { LeaseAlertBadge } from "@/features/alerts/components/LeaseAlertBadge";
import type { UccRecord } from "@/features/ucc/types/ucc.types";
import { Card, CardContent, CardHeader, CardTitle, EmptyState } from "@/shared/ui";

export function AlertsPanel({ record }: { record: UccRecord }) {
  const badge = (
    <LeaseAlertBadge
      leaseEndDate={record.leaseAlert?.leaseEndDate ?? record.leaseEndDate}
      active={record.leaseAlert?.withinAlertWindow}
      message={record.leaseAlert?.message}
    />
  );

  return (
    <Card>
      <CardHeader><CardTitle>Alerts</CardTitle></CardHeader>
      <CardContent>{badge || <EmptyState title="No active lease alerts" />}</CardContent>
    </Card>
  );
}
