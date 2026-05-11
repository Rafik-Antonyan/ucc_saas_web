import { api } from "@/shared/api/client";
import { endpoints } from "@/shared/api/endpoints";
import type { ApiMeta } from "@/shared/types/api";
import type { PaginatedUccRecords, UccBulkImportPreview, UccBulkImportRecordInput, UccBulkImportResult, UccFormInput, UccListQuery, UccRecord, UccStatusInput } from "@/features/ucc/types/ucc.types";

type BackendUccListResponse = {
  records: UccRecord[];
  pagination?: ApiMeta;
};

function serializeListQuery(params?: UccListQuery) {
  if (!params) return undefined;
  return {
    ...params,
    sortOrder: params.sortDirection,
    sortDirection: undefined,
    cities: params.cities?.join(","),
    counties: params.counties?.join(","),
    zipCodes: params.zipCodes?.join(",")
  };
}

function normalizePaginated(data: UccRecord[] | PaginatedUccRecords | BackendUccListResponse, meta?: ApiMeta): PaginatedUccRecords {
  if (Array.isArray(data)) {
    const page = Number(meta?.page ?? 1);
    const pageSize = Number(meta?.pageSize ?? data.length);
    const total = Number(meta?.total ?? data.length);
    const totalPages = Number(meta?.totalPages ?? Math.max(1, Math.ceil(total / Math.max(1, pageSize))));
    return { data, meta: { page, pageSize, total, totalPages } };
  }

  if ("records" in data) {
    const records = Array.isArray(data.records) ? data.records : [];
    const pagination = data.pagination;
    const page = Number(pagination?.page ?? meta?.page ?? 1);
    const pageSize = Number(pagination?.pageSize ?? meta?.pageSize ?? records.length);
    const total = Number(pagination?.total ?? meta?.total ?? records.length);
    const totalPages = Number(pagination?.totalPages ?? meta?.totalPages ?? Math.max(1, Math.ceil(total / Math.max(1, pageSize))));

    return { data: records, meta: { ...pagination, page, pageSize, total, totalPages } };
  }

  const records = Array.isArray(data.data) ? data.data : [];
  const page = Number(data.meta?.page ?? meta?.page ?? 1);
  const pageSize = Number(data.meta?.pageSize ?? meta?.pageSize ?? records.length);
  const total = Number(data.meta?.total ?? meta?.total ?? records.length);
  const totalPages = Number(data.meta?.totalPages ?? meta?.totalPages ?? Math.max(1, Math.ceil(total / Math.max(1, pageSize))));

  return { data: records, meta: { ...data.meta, page, pageSize, total, totalPages } };
}

export const uccApi = {
  list: async (params?: UccListQuery) => {
    const response = await api.getResponse<UccRecord[] | PaginatedUccRecords | BackendUccListResponse>(endpoints.ucc.base, { params: serializeListQuery(params) });
    return normalizePaginated(response.data, response.meta);
  },
  getById: (id: string) => api.get<UccRecord>(endpoints.ucc.byId(id)),
  create: (input: UccFormInput) => api.post<UccRecord, UccFormInput>(endpoints.ucc.base, input),
  bulkImportPreview: (records: UccBulkImportRecordInput[]) => api.post<UccBulkImportPreview, { records: UccBulkImportRecordInput[] }>(endpoints.ucc.bulkImportPreview, { records }),
  bulkImport: (records: UccBulkImportRecordInput[]) => api.post<UccBulkImportResult, { records: UccBulkImportRecordInput[] }>(endpoints.ucc.bulkImport, { records }),
  update: (id: string, input: Partial<UccFormInput>) => api.patch<UccRecord, Partial<UccFormInput>>(endpoints.ucc.byId(id), input),
  updateStatus: async (id: string, input: UccStatusInput) => {
    let record: UccRecord | undefined;
    if (input.proposalSent) {
      record = await api.post<UccRecord>(endpoints.ucc.proposalSent(id));
    }
    if (input.soldClosed) {
      record = await api.post<UccRecord>(endpoints.ucc.customerClosed(id));
    }
    return record ?? api.patch<UccRecord, UccStatusInput>(endpoints.ucc.byId(id), input);
  },
  delete: (id: string) => api.delete<{ id: string }>(endpoints.ucc.byId(id))
};
