"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ActivityTimeline } from "@/features/activities/components/ActivityTimeline";
import { AlertsPanel } from "@/features/alerts/components/AlertsPanel";
import { DuplicateWarning } from "@/features/ucc/components/DuplicateWarning";
import { FollowUpsPanel } from "@/features/followups/components/FollowUpsPanel";
import { NotesPanel } from "@/features/notes/components/NotesPanel";
import { UccDetailCard } from "@/features/ucc/components/UccDetailCard";
import { UccStatusPanel } from "@/features/ucc/components/UccStatusPanel";
import { useUccRecordQuery } from "@/features/ucc/api/ucc.queries";
import { ErrorState, LoadingState, PageHeader } from "@/shared/ui";

export function UccLeadDetailPage({ id, admin = false }: { id: string; admin?: boolean }) {
  const recordQuery = useUccRecordQuery(id);
  const basePath = admin ? "/admin/ucc" : "/company/leads";

  if (recordQuery.isLoading) return <LoadingState />;
  if (recordQuery.error) return <ErrorState error={recordQuery.error} />;
  if (!recordQuery.data) return <ErrorState error={{ message: "UCC record was not found." }} />;

  const record = recordQuery.data;

  return (
    <>
      <PageHeader
        title={record.debtorName}
        description="Lead detail, CRM status, notes, follow-ups, alerts, and activity history."
        action={<Link className="inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50" href={basePath}><ArrowLeft className="h-4 w-4" /> Back</Link>}
      />
      <div className="space-y-6">
        <DuplicateWarning warning={record.duplicateWarning} />
        <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(360px,1fr)]">
          <div className="space-y-6">
            <UccDetailCard record={record} />
            <NotesPanel uccRecordId={record.id} />
            <ActivityTimeline uccRecordId={record.id} />
          </div>
          <div className="space-y-6">
            <AlertsPanel record={record} />
            <UccStatusPanel record={record} />
            <FollowUpsPanel uccRecordId={record.id} />
          </div>
        </div>
      </div>
    </>
  );
}
