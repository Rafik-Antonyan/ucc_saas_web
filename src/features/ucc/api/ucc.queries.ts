"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { uccApi } from "@/features/ucc/api/ucc.api";
import type { UccBulkImportRecordInput, UccFormInput, UccListQuery, UccStatusInput } from "@/features/ucc/types/ucc.types";

export const uccQueryKeys = {
  all: ["ucc"] as const,
  list: (query?: UccListQuery) => ["ucc", "list", query ?? {}] as const,
  detail: (id: string) => ["ucc", "detail", id] as const
};

export function useUccRecordsQuery(query?: UccListQuery) {
  return useQuery({ queryKey: uccQueryKeys.list(query), queryFn: () => uccApi.list(query) });
}

export function useUccRecordQuery(id: string) {
  return useQuery({ queryKey: uccQueryKeys.detail(id), queryFn: () => uccApi.getById(id), enabled: Boolean(id) });
}

export function useCreateUccRecordMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UccFormInput) => uccApi.create(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: uccQueryKeys.all })
  });
}

export function useUccBulkImportPreviewMutation() {
  return useMutation({
    mutationFn: (records: UccBulkImportRecordInput[]) => uccApi.bulkImportPreview(records)
  });
}

export function useUccBulkImportMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (records: UccBulkImportRecordInput[]) => uccApi.bulkImport(records),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: uccQueryKeys.all })
  });
}

export function useUpdateUccRecordMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<UccFormInput>) => uccApi.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: uccQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: uccQueryKeys.detail(id) });
    }
  });
}

export function useUpdateUccStatusMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UccStatusInput) => uccApi.updateStatus(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: uccQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: uccQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    }
  });
}

export function useDeleteUccRecordMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => uccApi.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: uccQueryKeys.all })
  });
}
