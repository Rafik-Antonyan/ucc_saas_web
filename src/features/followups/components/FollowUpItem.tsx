"use client";

import type { Followup } from "@/features/followups/types/followups.types";
import { useUpdateFollowupMutation } from "@/features/followups/api/followups.queries";
import { formatDate } from "@/shared/lib/format-date";
import { Badge, Select } from "@/shared/ui";

const statusTone = {
  OPEN: "warning",
  COMPLETED: "success",
  CANCELLED: "default"
} as const;

export function FollowUpItem({ followup }: { followup: Followup }) {
  const mutation = useUpdateFollowupMutation();
  const status = followup.status ?? (followup.completedAt ? "COMPLETED" : "OPEN");

  return (
    <article className="rounded-md border border-slate-200 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-950">{followup.note || followup.title || "Follow-up"}</p>
          <p className="mt-1 text-xs text-slate-500">{formatDate(followup.followUpDate ?? followup.dueAt)}</p>
        </div>
        <Badge tone={statusTone[status]}>{status}</Badge>
      </div>
      <Select
        className="mt-3"
        value={status}
        disabled={mutation.isPending}
        onChange={(event) => mutation.mutate({ id: followup.id, input: { status: event.target.value as Followup["status"] } })}
      >
        <option value="OPEN">Open</option>
        <option value="COMPLETED">Completed</option>
        <option value="CANCELLED">Cancelled</option>
      </Select>
    </article>
  );
}
