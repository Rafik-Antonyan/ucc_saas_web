import type { LeadNote } from "@/features/notes/types/notes.types";
import { formatDate } from "@/shared/lib/format-date";

function userName(author: LeadNote["author"]) {
  return [author?.firstName, author?.lastName].filter(Boolean).join(" ") || author?.email || "Unknown user";
}

export function NoteItem({ note }: { note: LeadNote }) {
  return (
    <article className="rounded-md border border-slate-200 bg-slate-50 p-3">
      <p className="text-sm leading-6 text-slate-800">{note.body || note.note}</p>
      <p className="mt-2 text-xs text-slate-500">{userName(note.author)} · {formatDate(note.createdAt)}</p>
    </article>
  );
}
