import { api } from "@/shared/api/client";
import { endpoints } from "@/shared/api/endpoints";
import type { CreateNoteInput, LeadNote, NoteListQuery } from "@/features/notes/types/notes.types";

export const notesApi = {
  list: (params?: NoteListQuery) => api.get<LeadNote[]>(endpoints.notes.base, { params }),
  create: (input: CreateNoteInput) => api.post<LeadNote, CreateNoteInput>(endpoints.notes.base, input)
};
