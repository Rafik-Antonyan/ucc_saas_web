"use client";

import { useState } from "react";
import { useCreateFollowupMutation } from "@/features/followups/api/followups.queries";
import { Button, Input, Textarea } from "@/shared/ui";

export function FollowUpForm({ uccRecordId }: { uccRecordId: string }) {
  const [followUpDate, setFollowUpDate] = useState("");
  const [note, setNote] = useState("");
  const mutation = useCreateFollowupMutation();

  return (
    <form
      className="space-y-2"
      onSubmit={async (event) => {
        event.preventDefault();
        if (!followUpDate || !note.trim()) return;
        await mutation.mutateAsync({ uccRecordId, followUpDate, dueAt: followUpDate, note: note.trim(), title: note.trim(), status: "OPEN" });
        setFollowUpDate("");
        setNote("");
      }}
    >
      <Input type="date" value={followUpDate} onChange={(event) => setFollowUpDate(event.target.value)} />
      <Textarea rows={3} placeholder="Follow-up note" value={note} onChange={(event) => setNote(event.target.value)} />
      {mutation.error ? <p className="text-sm text-red-600">{mutation.error.message}</p> : null}
      <div className="flex justify-end">
        <Button type="submit" isLoading={mutation.isPending}>Create follow-up</Button>
      </div>
    </form>
  );
}
