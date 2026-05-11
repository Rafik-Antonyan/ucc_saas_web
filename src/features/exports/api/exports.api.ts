import { api } from "@/shared/api/client";
import { endpoints } from "@/shared/api/endpoints";
import type { ExportListQuery, ExportRequest } from "@/features/exports/types/exports.types";

export const exportsApi = {
  list: (params?: ExportListQuery) => api.get<ExportRequest[]>(endpoints.exports.base, { params })
};
