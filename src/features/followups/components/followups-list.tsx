"use client";

import Link from "next/link";
import { useFollowupsQuery } from "@/features/followups/api/followups.queries";
import type { Followup } from "@/features/followups/types/followups.types";
import { Badge, DataTable, type DataTableColumn, ErrorState, LoadingState, PageHeader } from "@/shared/ui";

export function FollowupsList() {
  const followupsQuery = useFollowupsQuery();
  const columns: DataTableColumn<Followup>[] = [
    { key: "title", header: "Title", render: (followup) => <Link className="font-medium text-primary" href={`/followups/${followup.id}`}>{followup.title}</Link> },
    { key: "due", header: "Due", render: (followup) => new Date(followup.dueAt).toLocaleString() },
    { key: "lead", header: "Lead", render: (followup) => followup.uccRecord?.debtorName || followup.uccRecordId || "-" },
    { key: "status", header: "Status", render: (followup) => <Badge tone={followup.completedAt ? "success" : "warning"}>{followup.completedAt ? "Completed" : "Open"}</Badge> }
  ];

  return (
    <>
      <PageHeader title="Followups" description="Open and completed lead followups." />
      {followupsQuery.isLoading ? <LoadingState /> : null}
      {followupsQuery.error ? <ErrorState error={followupsQuery.error} /> : null}
      {followupsQuery.data ? <DataTable data={followupsQuery.data} columns={columns} emptyTitle="No followups found" /> : null}
    </>
  );
}
