"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";
import { debtorAddress, debtorCity, debtorCounty, debtorPhone, debtorState, debtorZip, securedPartyName } from "@/features/ucc/lib/ucc-record-fields";
import type { UccRecord, UccSortField } from "@/features/ucc/types/ucc.types";
import { formatDate } from "@/shared/lib/format-date";
import { formatPhone } from "@/shared/lib/format-phone";
import { DataTable, type DataTableColumn, SortableHeader } from "@/shared/ui";
import { Button } from "@/shared/ui/button";

export function UccTable({
  records,
  basePath,
  admin = false,
  sortBy,
  sortDirection,
  onSort,
  onDelete
}: {
  records: UccRecord[];
  basePath: string;
  admin?: boolean;
  sortBy?: UccSortField;
  sortDirection?: "asc" | "desc";
  onSort: (field: UccSortField) => void;
  onDelete?: (record: UccRecord) => void;
}) {
  const router = useRouter();
  const sortable = (field: UccSortField, label: string) => (
    <SortableHeader field={field} label={label} sortBy={sortBy} sortDirection={sortDirection} onSort={onSort} />
  );
  const columns: DataTableColumn<UccRecord>[] = [
    { key: "filingDate", header: sortable("filingDate", "Filing date"), render: (record) => formatDate(record.filingDate) },
    { key: "debtorName", header: sortable("debtorName", "Debtor name"), render: (record) => <span className="font-medium text-slate-950">{record.debtorName}</span> },
    { key: "address", header: "Debtor address", render: (record) => debtorAddress(record) || "-" },
    { key: "city", header: sortable("debtorCity", "City"), render: (record) => debtorCity(record) || "-" },
    { key: "state", header: sortable("debtorState", "State"), render: (record) => debtorState(record) || "-" },
    { key: "zip", header: sortable("debtorZipCode", "ZIP code"), render: (record) => debtorZip(record) || "-" },
    { key: "county", header: sortable("debtorCounty", "County"), render: (record) => debtorCounty(record) || "-" },
    { key: "phone", header: "Phone number", render: (record) => formatPhone(debtorPhone(record)) },
    { key: "secured", header: sortable("securedPartyName", "Secured party"), render: (record) => securedPartyName(record) || "-" },
    { key: "lease", header: sortable("leaseEndDate", "Lease end date"), render: (record) => formatDate(record.leaseEndDate) },
    {
      key: "actions",
      header: "Actions",
      className: "w-[150px]",
      render: (record) => (
        <div className="flex items-center gap-1" onClick={(event) => event.stopPropagation()}>
          <Button type="button" variant="ghost" className="h-9 w-9 p-0" onClick={() => router.push(`${basePath}/${record.id}`)} aria-label="Open record">
            <Edit className="h-4 w-4" />
          </Button>
          {admin && onDelete ? (
            <Button type="button" variant="ghost" className="h-9 w-9 p-0 text-red-700" onClick={() => onDelete(record)} aria-label="Delete record">
              <Trash2 className="h-4 w-4" />
            </Button>
          ) : null}
          {!admin ? <Link className="text-sm font-medium text-primary" href={`${basePath}/${record.id}`}>Open</Link> : null}
        </div>
      )
    }
  ];

  return <DataTable data={records} columns={columns} emptyTitle="No UCC records found" onRowClick={(record) => router.push(`${basePath}/${record.id}`)} />;
}
