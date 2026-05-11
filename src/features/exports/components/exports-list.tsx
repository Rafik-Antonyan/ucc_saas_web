"use client";

import { useExportsQuery } from "@/features/exports/api/exports.queries";
import type { ExportRequest } from "@/features/exports/types/exports.types";
import { Badge, DataTable, type DataTableColumn, ErrorState, LoadingState, PageHeader } from "@/shared/ui";

export function ExportsList() {
  const exportsQuery = useExportsQuery();
  const columns: DataTableColumn<ExportRequest>[] = [
    { key: "type", header: "Type", render: (request) => request.type },
    { key: "status", header: "Status", render: (request) => <Badge tone={request.status === "COMPLETED" ? "success" : "warning"}>{request.status}</Badge> },
    { key: "created", header: "Created", render: (request) => new Date(request.createdAt).toLocaleString() },
    { key: "file", header: "File", render: (request) => request.fileUrl ? <a className="text-primary" href={request.fileUrl}>Download</a> : "-" }
  ];

  return (
    <>
      <PageHeader title="Exports" description="Export requests and generated files." />
      {exportsQuery.isLoading ? <LoadingState /> : null}
      {exportsQuery.error ? <ErrorState error={exportsQuery.error} /> : null}
      {exportsQuery.data ? <DataTable data={exportsQuery.data} columns={columns} emptyTitle="No exports found" /> : null}
    </>
  );
}
