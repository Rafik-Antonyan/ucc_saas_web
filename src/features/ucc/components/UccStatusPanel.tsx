"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { useUpdateUccStatusMutation } from "@/features/ucc/api/ucc.queries";
import type { UccRecord } from "@/features/ucc/types/ucc.types";
import { formatDate } from "@/shared/lib/format-date";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

export function UccStatusPanel({ record }: { record: UccRecord }) {
  const mutation = useUpdateUccStatusMutation(record.id);
  const [message, setMessage] = useState("");

  async function updateStatus(input: { proposalSent?: boolean; soldClosed?: boolean }) {
    setMessage("");
    await mutation.mutateAsync(input);
    setMessage("Status updated.");
  }

  return (
    <Card>
      <CardHeader><CardTitle>Status</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-950">Proposal sent</p>
              <p className="text-xs text-slate-500">{record.proposalSentAt ? formatDate(record.proposalSentAt) : "No proposal date recorded"}</p>
            </div>
            <Badge tone={record.proposalSent ? "success" : "default"}>{record.proposalSent ? "Sent" : "Not sent"}</Badge>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-950">Customer sold/closed</p>
              <p className="text-xs text-slate-500">{record.soldClosedAt ? formatDate(record.soldClosedAt) : "No close date recorded"}</p>
            </div>
            <Badge tone={record.soldClosed ? "success" : "default"}>{record.soldClosed ? "Closed" : "Open"}</Badge>
          </div>
        </div>
        {message ? <p className="rounded bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{message}</p> : null}
        {mutation.error ? <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">{mutation.error.message}</p> : null}
        <div className="grid gap-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" isLoading={mutation.isPending} onClick={() => updateStatus({ proposalSent: true })}>
            <Send className="h-4 w-4" /> Mark proposal sent
          </Button>
          <Button type="button" isLoading={mutation.isPending} onClick={() => updateStatus({ soldClosed: true })}>
            <CheckCircle2 className="h-4 w-4" /> Mark customer closed
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
