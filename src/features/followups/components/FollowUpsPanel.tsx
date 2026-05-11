"use client";

import { FollowUpForm } from "@/features/followups/components/FollowUpForm";
import { FollowUpItem } from "@/features/followups/components/FollowUpItem";
import { useFollowupsQuery } from "@/features/followups/api/followups.queries";
import { Card, CardContent, CardHeader, CardTitle, EmptyState, ErrorState, LoadingState } from "@/shared/ui";

export function FollowUpsPanel({ uccRecordId }: { uccRecordId: string }) {
  const followupsQuery = useFollowupsQuery({ uccRecordId });

  return (
    <Card>
      <CardHeader><CardTitle>Follow-ups</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <FollowUpForm uccRecordId={uccRecordId} />
        {followupsQuery.isLoading ? <LoadingState /> : null}
        {followupsQuery.error ? <ErrorState error={followupsQuery.error} /> : null}
        {followupsQuery.data?.length ? (
          <div className="space-y-3">{followupsQuery.data.map((followup) => <FollowUpItem key={followup.id} followup={followup} />)}</div>
        ) : !followupsQuery.isLoading ? <EmptyState title="No follow-ups yet" /> : null}
      </CardContent>
    </Card>
  );
}
