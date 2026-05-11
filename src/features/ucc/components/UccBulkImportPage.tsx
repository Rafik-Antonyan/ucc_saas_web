"use client";

import Link from "next/link";
import { Download, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import { useCompaniesQuery } from "@/features/companies/api/companies.queries";
import { useUccBulkImportMutation, useUccBulkImportPreviewMutation } from "@/features/ucc/api/ucc.queries";
import type { UccBulkImportRecordInput } from "@/features/ucc/types/ucc.types";
import { getErrorMessage } from "@/shared/lib/error";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, ErrorState, Input, LoadingState, PageHeader, Select, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui";

const templateHeaders = [
  "filingDate",
  "debtorName",
  "debtorAddress",
  "debtorCity",
  "debtorState",
  "debtorZipCode",
  "debtorCounty",
  "debtorPhoneNumber",
  "securedPartyName",
  "collateralDescription",
  "leaseEndDate",
  "fileNumber"
] as const;

type TemplateHeader = (typeof templateHeaders)[number];
type ParsedRow = UccBulkImportRecordInput & { rowNumber: number };

function csvEscape(value: string) {
  return /[",\n]/.test(value) ? `"${value.replaceAll("\"", "\"\"")}"` : value;
}

function splitCsvLine(line: string) {
  const cells: string[] = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === "\"" && quoted && next === "\"") {
      current += "\"";
      index += 1;
    } else if (char === "\"") {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      cells.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  cells.push(current.trim());
  return cells;
}

function optional(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function parseCsv(text: string, companyId: string) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length < 2) {
    throw new Error("CSV must include a header row and at least one record.");
  }

  const headers = splitCsvLine(lines[0]);
  const missingHeaders = templateHeaders.filter((header) => !headers.includes(header));
  if (missingHeaders.length) {
    throw new Error(`CSV is missing required columns: ${missingHeaders.join(", ")}`);
  }

  return lines.slice(1).map((line, index) => {
    const cells = splitCsvLine(line);
    const values = headers.reduce<Record<string, string>>((result, header, cellIndex) => {
      result[header] = cells[cellIndex] ?? "";
      return result;
    }, {});
    const debtorState = optional(values.debtorState)?.toUpperCase();

    return {
      companyId,
      rowNumber: index + 2,
      filingDate: optional(values.filingDate),
      debtorName: values.debtorName.trim(),
      debtorAddress: optional(values.debtorAddress),
      debtorCity: optional(values.debtorCity),
      debtorState,
      debtorZipCode: optional(values.debtorZipCode),
      debtorCounty: optional(values.debtorCounty),
      debtorPhoneNumber: optional(values.debtorPhoneNumber),
      securedPartyName: optional(values.securedPartyName),
      collateralDescription: optional(values.collateralDescription),
      leaseEndDate: optional(values.leaseEndDate),
      fileNumber: optional(values.fileNumber)
    } satisfies ParsedRow;
  });
}

function downloadTemplate() {
  const content = `${templateHeaders.map(csvEscape).join(",")}\n`;
  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "ucc-bulk-import-template.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}

export function UccBulkImportPage() {
  const companiesQuery = useCompaniesQuery();
  const previewMutation = useUccBulkImportPreviewMutation();
  const importMutation = useUccBulkImportMutation();
  const [companyId, setCompanyId] = useState("");
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const activeCompanies = companiesQuery.data?.filter((company) => company.isActive) ?? [];
  const preview = previewMutation.data;
  const canImport = Boolean(preview && preview.invalid === 0 && rows.length > 0);

  const rowsByIndex = useMemo(() => new Map(rows.map((row, index) => [index, row])), [rows]);

  async function handleFile(file: File | undefined) {
    previewMutation.reset();
    importMutation.reset();
    setRows([]);
    setParseError(null);

    if (!file) return;
    if (!companyId) {
      setParseError("Select a company before uploading the CSV.");
      return;
    }

    try {
      const parsedRows = parseCsv(await file.text(), companyId);
      setRows(parsedRows);
      await previewMutation.mutateAsync(parsedRows);
    } catch (error) {
      setParseError(getErrorMessage(error));
    }
  }

  async function handleImport() {
    await importMutation.mutateAsync(rows);
  }

  return (
    <>
      <PageHeader title="Bulk import" description="Upload UCC records from the CSV template and preview validation before import." />
      <div className="space-y-4">
        <Card>
          <CardHeader><CardTitle>Import file</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="secondary" onClick={downloadTemplate}>
                <Download className="h-4 w-4" /> Download template
              </Button>
              <Link className="inline-flex min-h-10 items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50" href="/admin/ucc">Back to UCC records</Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm font-medium text-slate-700">
                <span>Company</span>
                <Select value={companyId} disabled={companiesQuery.isLoading} onChange={(event) => setCompanyId(event.target.value)}>
                  <option value="">{companiesQuery.isLoading ? "Loading companies..." : "Select company"}</option>
                  {activeCompanies.map((company) => (
                    <option key={company.id} value={company.id}>{company.name}</option>
                  ))}
                </Select>
              </label>
              <label className="space-y-1 text-sm font-medium text-slate-700">
                <span>CSV file</span>
                <Input type="file" accept=".csv,text/csv" disabled={!companyId} onChange={(event) => void handleFile(event.target.files?.[0])} />
              </label>
            </div>

            <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              Required CSV columns: {templateHeaders.join(", ")}. Select the company once here; do not put company IDs in the CSV.
            </div>

            {companiesQuery.error ? <ErrorState error={companiesQuery.error} /> : null}
            {parseError ? <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">{parseError}</p> : null}
            {previewMutation.error ? <ErrorState error={previewMutation.error} /> : null}
            {previewMutation.isPending ? <LoadingState label="Checking CSV rows..." /> : null}
          </CardContent>
        </Card>

        {preview ? (
          <Card>
            <CardHeader><CardTitle>Preview</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <Badge>Total {preview.total}</Badge>
                <Badge tone="success">Valid {preview.valid}</Badge>
                <Badge tone={preview.invalid ? "danger" : "success"}>Invalid {preview.invalid}</Badge>
              </div>
              <div className="overflow-x-auto rounded-md border border-slate-200">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeader>Row</TableHeader>
                      <TableHeader>Status</TableHeader>
                      <TableHeader>Debtor</TableHeader>
                      <TableHeader>File number</TableHeader>
                      <TableHeader>Messages</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {preview.rows.map((row) => {
                      const parsedRow = rowsByIndex.get(row.index);
                      return (
                        <TableRow key={row.index}>
                          <TableCell>{parsedRow?.rowNumber ?? row.index + 2}</TableCell>
                          <TableCell><Badge tone={row.valid ? "success" : "danger"}>{row.valid ? "Valid" : "Invalid"}</Badge></TableCell>
                          <TableCell>{parsedRow?.debtorName || "-"}</TableCell>
                          <TableCell>{parsedRow?.fileNumber || "-"}</TableCell>
                          <TableCell>{[...row.errors, ...row.warnings].join("; ") || "-"}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              {importMutation.error ? <ErrorState error={importMutation.error} /> : null}
              {importMutation.data ? <p className="rounded bg-emerald-50 px-3 py-2 text-sm text-emerald-800">Imported {importMutation.data.created} UCC records.</p> : null}
              <div className="flex justify-end">
                <Button type="button" disabled={!canImport || Boolean(importMutation.data)} isLoading={importMutation.isPending} onClick={() => void handleImport()}>
                  <Upload className="h-4 w-4" /> Import valid rows
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </>
  );
}
