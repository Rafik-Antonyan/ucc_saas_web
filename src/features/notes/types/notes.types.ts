import type { LeadNote } from "@/shared/types/domain";

export type NoteListQuery = {
  uccRecordId?: string;
};

export type CreateNoteInput = {
  uccRecordId: string;
  body: string;
};

export type { LeadNote };
