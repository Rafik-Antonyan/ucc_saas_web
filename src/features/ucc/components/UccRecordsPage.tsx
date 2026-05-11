"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Upload, Plus } from "lucide-react";
import { useState } from "react";
import { UccFilters } from "@/features/ucc/components/UccFilters";
import { UccSearchBar } from "@/features/ucc/components/UccSearchBar";
import { UccTable } from "@/features/ucc/components/UccTable";
import { useDeleteUccRecordMutation, useUccRecordsQuery } from "@/features/ucc/api/ucc.queries";
import type { UccListQuery, UccRecord, UccSortField } from "@/features/ucc/types/ucc.types";
import { TerritorySummary } from "@/features/territories/components/TerritorySummary";
import { parseCsvParam, mergeQueryParams } from "@/shared/lib/query-builder";
import { Button, ConfirmDialog, ErrorState, LoadingState, PageHeader, Pagination } from "@/shared/ui";

function listQueryFromParams(params: URLSearchParams): UccListQuery {
  return {
    search: params.get("search") || undefined,
    filingDateFrom: params.get("filingDateFrom") || undefined,
    filingDateTo: params.get("filingDateTo") || undefined,
    debtorName: params.get("debtorName") || undefined,
    securedPartyName: params.get("securedPartyName") || undefined,
    cities: parseCsvParam(params.get("city") || params.get("cities") || undefined),
    counties: parseCsvParam(params.get("county") || params.get("counties") || undefined),
    zipCodes: parseCsvParam(params.get("zip") || params.get("zipCodes") || undefined),
    leaseEndYear: params.get("leaseEndYear") || undefined,
    sortBy: (params.get("sortBy") as UccSortField | null) || "filingDate",
    sortDirection: (params.get("sortDirection") as "asc" | "desc" | null) || "desc",
    page: Number(params.get("page") || 1),
    pageSize: Number(params.get("pageSize") || 25)
  };
}

export function UccRecordsPage({ admin = false }: { admin?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = listQueryFromParams(searchParams);
  const recordsQuery = useUccRecordsQuery(query);
  const deleteMutation = useDeleteUccRecordMutation();
  const [deleteTarget, setDeleteTarget] = useState<UccRecord | null>(null);
  const basePath = admin ? "/admin/ucc" : "/company/leads";

  function replaceQuery(values: Record<string, string | number | string[] | undefined | null>) {
    const next = mergeQueryParams(searchParams, values);
    router.replace(`${basePath}?${next.toString()}`);
  }

  function handleSort(field: UccSortField) {
    replaceQuery({
      sortBy: field,
      sortDirection: query.sortBy === field && query.sortDirection === "asc" ? "desc" : "asc",
      page: 1
    });
  }

  const meta = recordsQuery.data?.meta;
  const records = recordsQuery.data?.data ?? [];

  return (
    <>
      <PageHeader
        title={admin ? "Admin UCC records" : "UCC leads"}
        description={admin ? "View, create, edit, delete, and import UCC records." : "Company territory access is enforced by the backend response."}
        action={admin ? (
          <div className="flex gap-2">
            <Link className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50" href="/admin/ucc/import">
              <Upload className="h-4 w-4" /> Import
            </Link>
            <Link className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800" href="/admin/ucc/new">
              <Plus className="h-4 w-4" /> Create record
            </Link>
          </div>
        ) : null}
      />
      <div className="space-y-4">
        {!admin ? <TerritorySummary /> : null}
        <UccSearchBar value={query.search} onSearch={(search) => replaceQuery({ search, page: 1 })} />
        <UccFilters
          filters={query}
          onApply={(filters) => replaceQuery({
            filingDateFrom: filters.filingDateFrom,
            filingDateTo: filters.filingDateTo,
            debtorName: filters.debtorName,
            securedPartyName: filters.securedPartyName,
            city: filters.cities,
            county: filters.counties,
            zip: filters.zipCodes,
            leaseEndYear: filters.leaseEndYear,
            page: 1
          })}
          onClear={() => router.replace(basePath)}
        />
        {recordsQuery.isLoading ? <LoadingState /> : null}
        {recordsQuery.error ? <ErrorState error={recordsQuery.error} /> : null}
        {recordsQuery.data ? (
          <>
            <UccTable
              records={records}
              basePath={basePath}
              admin={admin}
              sortBy={query.sortBy}
              sortDirection={query.sortDirection}
              onSort={handleSort}
              onDelete={setDeleteTarget}
            />
            <Pagination
              page={meta?.page ?? query.page ?? 1}
              canPrevious={(meta?.page ?? query.page ?? 1) > 1}
              canNext={(meta?.page ?? 1) < (meta?.totalPages ?? 1)}
              onPrevious={() => replaceQuery({ page: Math.max(1, (meta?.page ?? query.page ?? 1) - 1) })}
              onNext={() => replaceQuery({ page: (meta?.page ?? query.page ?? 1) + 1 })}
            />
          </>
        ) : null}
      </div>
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete UCC record"
        description={`Delete ${deleteTarget?.debtorName ?? "this UCC record"}? This action is sent to the backend and cannot be undone from the frontend.`}
        confirmLabel="Delete"
        isLoading={deleteMutation.isPending}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={async () => {
          if (!deleteTarget) return;
          await deleteMutation.mutateAsync(deleteTarget.id);
          setDeleteTarget(null);
        }}
      />
    </>
  );
}
