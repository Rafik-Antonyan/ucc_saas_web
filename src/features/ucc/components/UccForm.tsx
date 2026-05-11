"use client";

import { useMemo, useState } from "react";
import { DuplicateWarning } from "@/features/ucc/components/DuplicateWarning";
import type { UccDuplicateWarning, UccFormInput, UccRecord } from "@/features/ucc/types/ucc.types";
import { debtorAddress, debtorCity, debtorCounty, debtorPhone, debtorState, debtorZip, fileNumber, securedPartyName, collateralDescription } from "@/features/ucc/lib/ucc-record-fields";
import { getErrorMessage, normalizeError } from "@/shared/lib/error";
import { toDateInputValue } from "@/shared/lib/format-date";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Select, Textarea } from "@/shared/ui";

type FormState = Record<keyof UccFormInput, string>;
type CompanyOption = {
  id: string;
  name: string;
};

const required: Array<keyof UccFormInput> = [
  "companyId",
  "filingDate",
  "debtorName",
  "debtorAddress",
  "debtorCity",
  "debtorState",
  "debtorZipCode",
  "debtorCounty",
  "securedPartyName"
];

function formFromRecord(record?: UccRecord): FormState {
  return {
    companyId: record?.companyId ?? "",
    filingDate: toDateInputValue(record?.filingDate),
    debtorName: record?.debtorName ?? "",
    debtorAddress: debtorAddress(record) || "",
    debtorCity: debtorCity(record) || "",
    debtorState: debtorState(record) || "",
    debtorZipCode: debtorZip(record) || "",
    debtorCounty: debtorCounty(record) || "",
    debtorPhoneNumber: debtorPhone(record) || "",
    securedPartyName: securedPartyName(record) || "",
    collateralDescription: collateralDescription(record) || "",
    leaseEndDate: toDateInputValue(record?.leaseEndDate),
    fileNumber: fileNumber(record) || ""
  };
}

function duplicateFromError(error: unknown): UccDuplicateWarning | null {
  const details = normalizeError(error).details;
  if (!details || typeof details !== "object") return null;
  if ("duplicateWarning" in details && typeof details.duplicateWarning === "object") {
    return details.duplicateWarning as UccDuplicateWarning;
  }
  if ("duplicate" in details && typeof details.duplicate === "object") {
    return details.duplicate as UccDuplicateWarning;
  }
  return null;
}

function Field({
  label,
  name,
  value,
  error,
  type = "text",
  maxLength,
  placeholder,
  onChange
}: {
  label: string;
  name: keyof UccFormInput;
  value: string;
  error?: string;
  type?: string;
  maxLength?: number;
  placeholder?: string;
  onChange: (name: keyof UccFormInput, value: string) => void;
}) {
  return (
    <label className="space-y-1 text-sm font-medium text-slate-700">
      <span>{label}</span>
      <Input
        type={type}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(event) => onChange(name, event.target.value)}
        aria-invalid={Boolean(error)}
      />
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}

function normalizeSubmitValues(values: FormState): UccFormInput {
  return {
    companyId: values.companyId.trim(),
    filingDate: values.filingDate.trim(),
    debtorName: values.debtorName.trim(),
    debtorAddress: values.debtorAddress.trim(),
    debtorCity: values.debtorCity.trim(),
    debtorState: values.debtorState.trim().toUpperCase(),
    debtorZipCode: values.debtorZipCode.trim(),
    debtorCounty: values.debtorCounty.trim(),
    debtorPhoneNumber: values.debtorPhoneNumber.trim() || undefined,
    securedPartyName: values.securedPartyName.trim(),
    collateralDescription: values.collateralDescription.trim() || undefined,
    leaseEndDate: values.leaseEndDate.trim() || undefined,
    fileNumber: values.fileNumber.trim() || undefined
  };
}

export function UccForm({
  record,
  companyOptions = [],
  isCompanyLoading = false,
  companyError,
  title = "UCC record",
  submitLabel = "Save record",
  isSubmitting = false,
  error,
  onSubmit
}: {
  record?: UccRecord;
  companyOptions?: CompanyOption[];
  isCompanyLoading?: boolean;
  companyError?: unknown;
  title?: string;
  submitLabel?: string;
  isSubmitting?: boolean;
  error?: unknown;
  onSubmit: (input: UccFormInput) => Promise<void> | void;
}) {
  const initial = useMemo(() => formFromRecord(record), [record]);
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof UccFormInput, string>>>({});
  const duplicateWarning = record?.duplicateWarning ?? duplicateFromError(error);

  function setField(name: keyof UccFormInput, value: string) {
    const nextValue = name === "debtorState" ? value.toUpperCase().slice(0, 2) : value;
    setValues((current) => ({ ...current, [name]: nextValue }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function submit() {
    const nextErrors: Partial<Record<keyof UccFormInput, string>> = {};
    required.forEach((field) => {
      if (!values[field]?.trim()) nextErrors[field] = "Required";
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (values.debtorState.trim().length !== 2) {
      setErrors((current) => ({ ...current, debtorState: "Use a 2-letter state code" }));
      return;
    }

    await onSubmit(normalizeSubmitValues(values));
  }

  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent>
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            void submit();
          }}
        >
          <DuplicateWarning warning={duplicateWarning} />
          {error ? <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">{getErrorMessage(error)}</p> : null}
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm font-medium text-slate-700">
              <span>Company</span>
              <Select
                value={values.companyId}
                disabled={isCompanyLoading || Boolean(companyError)}
                onChange={(event) => setField("companyId", event.target.value)}
                aria-invalid={Boolean(errors.companyId)}
              >
                <option value="">
                  {isCompanyLoading ? "Loading companies..." : companyError ? "Unable to load companies" : companyOptions.length ? "Select company" : "No active companies found"}
                </option>
                {companyOptions.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </Select>
              {companyError ? (
                <span className="text-xs text-red-600">{getErrorMessage(companyError)}</span>
              ) : errors.companyId ? (
                <span className="text-xs text-red-600">{errors.companyId}</span>
              ) : !isCompanyLoading && companyOptions.length === 0 ? (
                <span className="text-xs text-slate-500">Create or activate a company first.</span>
              ) : null}
            </label>
            <Field label="Filing date" name="filingDate" type="date" value={values.filingDate} error={errors.filingDate} onChange={setField} />
            <Field label="File number" name="fileNumber" value={values.fileNumber} onChange={setField} />
            <Field label="Debtor name" name="debtorName" value={values.debtorName} error={errors.debtorName} onChange={setField} />
            <Field label="Secured party" name="securedPartyName" value={values.securedPartyName} error={errors.securedPartyName} onChange={setField} />
            <Field label="Debtor address" name="debtorAddress" value={values.debtorAddress} error={errors.debtorAddress} onChange={setField} />
            <Field label="City" name="debtorCity" value={values.debtorCity} error={errors.debtorCity} onChange={setField} />
            <Field label="State" name="debtorState" value={values.debtorState} error={errors.debtorState} maxLength={2} placeholder="CA" onChange={setField} />
            <Field label="ZIP code" name="debtorZipCode" value={values.debtorZipCode} error={errors.debtorZipCode} onChange={setField} />
            <Field label="County" name="debtorCounty" value={values.debtorCounty} error={errors.debtorCounty} onChange={setField} />
            <Field label="Phone number" name="debtorPhoneNumber" value={values.debtorPhoneNumber} onChange={setField} />
            <Field label="Lease end date" name="leaseEndDate" type="date" value={values.leaseEndDate} onChange={setField} />
          </div>
          <label className="block space-y-1 text-sm font-medium text-slate-700">
            <span>Collateral description</span>
            <Textarea rows={5} value={values.collateralDescription} onChange={(event) => setField("collateralDescription", event.target.value)} />
          </label>
          <div className="flex justify-end">
            <Button type="submit" isLoading={isSubmitting}>{submitLabel}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
