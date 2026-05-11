"use client";

import { useState } from "react";
import { useCreateNoteMutation } from "@/features/notes/api/notes.queries";
import { Button, Textarea } from "@/shared/ui";

export function NoteForm({ uccRecordId }: { uccRecordId: string }) {
  const [body, setBody] = useState("");
  const mutation = useCreateNoteMutation();

  return (
    <form
      className="space-y-2"
      onSubmit={async (event) => {
        event.preventDefault();
        if (!body.trim()) return;
        await mutation.mutateAsync({ uccRecordId, body: body.trim() });
        setBody("");
      }}
    >
      <Textarea rows={4} placeholder="Add a company-visible note" value={body} onChange={(event) => setBody(event.target.value)} />
      {mutation.error ? <p className="text-sm text-red-600">{mutation.error.message}</p> : null}
      <div className="flex justify-end">
        <Button type="submit" isLoading={mutation.isPending}>Add note</Button>
      </div>
    </form>
  );
}
