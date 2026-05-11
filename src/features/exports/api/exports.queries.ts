"use client";

import { useQuery } from "@tanstack/react-query";
import { exportsApi } from "@/features/exports/api/exports.api";
import type { ExportListQuery } from "@/features/exports/types/exports.types";

export const exportsQueryKeys = {
  all: ["exports"] as const,
  list: (query?: ExportListQuery) => ["exports", "list", query ?? {}] as const
};

export function useExportsQuery(query?: ExportListQuery) {
  return useQuery({ queryKey: exportsQueryKeys.list(query), queryFn: () => exportsApi.list(query) });
}
