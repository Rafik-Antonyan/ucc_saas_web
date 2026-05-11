import type { UccRecord } from "@/shared/types/domain";
import type { PaginatedResponse } from "@/shared/types/api";

export type UccListQuery = {
  search?: string;
  filingDateFrom?: string;
  filingDateTo?: string;
  debtorName?: string;
  securedPartyName?: string;
  cities?: string[];
  counties?: string[];
  zipCodes?: string[];
  leaseEndYear?: string;
  sortBy?: UccSortField;
  sortDirection?: "asc" | "desc";
  page?: number;
  pageSize?: number;
};

export type UccSortField =
  | "filingDate"
  | "debtorName"
  | "debtorCity"
  | "debtorState"
  | "debtorCounty"
  | "debtorZipCode"
  | "securedPartyName"
  | "leaseEndDate";

export type UccFormInput = {
  companyId: string;
  filingDate: string;
  debtorName: string;
  debtorAddress: string;
  debtorCity: string;
  debtorState: string;
  debtorZipCode: string;
  debtorCounty: string;
  debtorPhoneNumber?: string;
  securedPartyName: string;
  collateralDescription?: string;
  leaseEndDate?: string;
  fileNumber?: string;
};

export type UccBulkImportRecordInput = {
  companyId: string;
  filingDate?: string;
  debtorName: string;
  debtorAddress?: string;
  debtorCity?: string;
  debtorState?: string;
  debtorZipCode?: string;
  debtorCounty?: string;
  debtorPhoneNumber?: string;
  securedPartyName?: string;
  collateralDescription?: string;
  leaseEndDate?: string;
  fileNumber?: string;
};

export type UccStatusInput = {
  proposalSent?: boolean;
  soldClosed?: boolean;
};

export type UccDuplicateWarning = NonNullable<UccRecord["duplicateWarning"]>;
export type PaginatedUccRecords = PaginatedResponse<UccRecord>;

export type UccBulkImportPreviewRow = {
  index: number;
  valid: boolean;
  errors: string[];
  warnings: string[];
};

export type UccBulkImportPreview = {
  total: number;
  valid: number;
  invalid: number;
  rows: UccBulkImportPreviewRow[];
};

export type UccBulkImportResult = {
  total: number;
  created: number;
  records: UccRecord[];
  preview: UccBulkImportPreview;
};

export type { UccRecord };
