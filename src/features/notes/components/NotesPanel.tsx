"use client";

import { NoteForm } from "@/features/notes/components/NoteForm";
import { NoteItem } from "@/features/notes/components/NoteItem";
import { useNotesQuery } from "@/features/notes/api/notes.queries";
import { Card, CardContent, CardHeader, CardTitle, EmptyState, ErrorState, LoadingState } from "@/shared/ui";

export function NotesPanel({ uccRecordId }: { uccRecordId: string }) {
  const notesQuery = useNotesQuery({ uccRecordId });

  return (
    <Card>
      <CardHeader><CardTitle>Notes</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <NoteForm uccRecordId={uccRecordId} />
        {notesQuery.isLoading ? <LoadingState /> : null}
        {notesQuery.error ? <ErrorState error={notesQuery.error} /> : null}
        {notesQuery.data?.length ? (
          <div className="space-y-3">{notesQuery.data.map((note) => <NoteItem key={note.id} note={note} />)}</div>
        ) : !notesQuery.isLoading ? <EmptyState title="No notes yet" /> : null}
      </CardContent>
    </Card>
  );
}
