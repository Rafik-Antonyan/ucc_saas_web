"use client";

import { useFollowupsQuery } from "@/features/followups/api/followups.queries";
import { Badge, Card, CardContent, EmptyState, ErrorState, LoadingState, PageHeader } from "@/shared/ui";

export function FollowupDetail({ id }: { id: string }) {
  const followupsQuery = useFollowupsQuery();
  const followup = followupsQuery.data?.find((item) => item.id === id);

  if (followupsQuery.isLoading) return <LoadingState />;
  if (followupsQuery.error) return <ErrorState error={followupsQuery.error} />;
  if (!followup) return <EmptyState title="Followup detail is not available" description="The backend currently exposes list access only, so direct detail loading will become available when GET /followups/:id is added." />;

  return (
    <>
      <PageHeader title={followup.title} description="Followup detail." />
      <Card>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div><p className="text-xs uppercase text-slate-500">Due</p><p className="text-sm">{new Date(followup.dueAt).toLocaleString()}</p></div>
          <div><p className="text-xs uppercase text-slate-500">Status</p><Badge tone={followup.completedAt ? "success" : "warning"}>{followup.completedAt ? "Completed" : "Open"}</Badge></div>
          <div><p className="text-xs uppercase text-slate-500">Lead</p><p className="text-sm">{followup.uccRecord?.debtorName || followup.uccRecordId || "-"}</p></div>
          <div><p className="text-xs uppercase text-slate-500">Assigned to</p><p className="text-sm">{followup.assignedTo?.email || followup.assignedToId || "-"}</p></div>
        </CardContent>
      </Card>
    </>
  );
}
