"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notesApi } from "@/features/notes/api/notes.api";
import type { CreateNoteInput, NoteListQuery } from "@/features/notes/types/notes.types";

export const notesQueryKeys = {
  all: ["notes"] as const,
  list: (query?: NoteListQuery) => ["notes", "list", query ?? {}] as const
};

export function useNotesQuery(query?: NoteListQuery) {
  return useQuery({ queryKey: notesQueryKeys.list(query), queryFn: () => notesApi.list(query), enabled: Boolean(query?.uccRecordId) });
}

export function useCreateNoteMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateNoteInput) => notesApi.create(input),
    onSuccess: (_note, input) => {
      queryClient.invalidateQueries({ queryKey: notesQueryKeys.list({ uccRecordId: input.uccRecordId }) });
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    }
  });
}
