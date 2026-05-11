"use client";

import { ActivityItem } from "@/features/activities/components/ActivityItem";
import { useActivitiesQuery } from "@/features/activities/api/activities.queries";
import { Card, CardContent, CardHeader, CardTitle, EmptyState, ErrorState, LoadingState } from "@/shared/ui";

export function ActivityTimeline({ uccRecordId }: { uccRecordId: string }) {
  const activitiesQuery = useActivitiesQuery({ uccRecordId });

  return (
    <Card>
      <CardHeader><CardTitle>Activity timeline</CardTitle></CardHeader>
      <CardContent>
        {activitiesQuery.isLoading ? <LoadingState /> : null}
        {activitiesQuery.error ? <ErrorState error={activitiesQuery.error} /> : null}
        {activitiesQuery.data?.length ? (
          <ol className="space-y-4 border-l border-slate-200 pl-4">
            {activitiesQuery.data.map((activity) => <ActivityItem key={activity.id} activity={activity} />)}
          </ol>
        ) : !activitiesQuery.isLoading ? <EmptyState title="No activity yet" /> : null}
      </CardContent>
    </Card>
  );
}
