"use client";

import { useState } from "react";
import type { UccListQuery } from "@/features/ucc/types/ucc.types";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

function csv(value?: string[]) {
  return value?.join(", ") ?? "";
}

function splitCsv(value: string) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

export function UccFilters({ filters, onApply, onClear }: { filters: UccListQuery; onApply: (filters: UccListQuery) => void; onClear: () => void }) {
  const [draft, setDraft] = useState({
    filingDateFrom: filters.filingDateFrom ?? "",
    filingDateTo: filters.filingDateTo ?? "",
    debtorName: filters.debtorName ?? "",
    securedPartyName: filters.securedPartyName ?? "",
    cities: csv(filters.cities),
    counties: csv(filters.counties),
    zipCodes: csv(filters.zipCodes),
    leaseEndYear: filters.leaseEndYear ?? ""
  });

  const setField = (field: keyof typeof draft, value: string) => setDraft((current) => ({ ...current, [field]: value }));

  return (
    <form
      className="rounded-md border border-slate-200 bg-white p-4"
      onSubmit={(event) => {
        event.preventDefault();
        onApply({
          filingDateFrom: draft.filingDateFrom || undefined,
          filingDateTo: draft.filingDateTo || undefined,
          debtorName: draft.debtorName || undefined,
          securedPartyName: draft.securedPartyName || undefined,
          cities: splitCsv(draft.cities),
          counties: splitCsv(draft.counties),
          zipCodes: splitCsv(draft.zipCodes),
          leaseEndYear: draft.leaseEndYear || undefined,
          page: 1
        });
      }}
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <label className="space-y-1 text-sm font-medium text-slate-700">
          <span>Filing from</span>
          <Input type="date" value={draft.filingDateFrom} onChange={(event) => setField("filingDateFrom", event.target.value)} />
        </label>
        <label className="space-y-1 text-sm font-medium text-slate-700">
          <span>Filing to</span>
          <Input type="date" value={draft.filingDateTo} onChange={(event) => setField("filingDateTo", event.target.value)} />
        </label>
        <label className="space-y-1 text-sm font-medium text-slate-700">
          <span>Debtor name</span>
          <Input value={draft.debtorName} onChange={(event) => setField("debtorName", event.target.value)} />
        </label>
        <label className="space-y-1 text-sm font-medium text-slate-700">
          <span>Secured party</span>
          <Input value={draft.securedPartyName} onChange={(event) => setField("securedPartyName", event.target.value)} />
        </label>
        <label className="space-y-1 text-sm font-medium text-slate-700">
          <span>Cities</span>
          <Input placeholder="Los Angeles, Dallas" value={draft.cities} onChange={(event) => setField("cities", event.target.value)} />
        </label>
        <label className="space-y-1 text-sm font-medium text-slate-700">
          <span>Counties</span>
          <Input placeholder="Orange, Dallas" value={draft.counties} onChange={(event) => setField("counties", event.target.value)} />
        </label>
        <label className="space-y-1 text-sm font-medium text-slate-700">
          <span>ZIP codes</span>
          <Input placeholder="90001, 75201" value={draft.zipCodes} onChange={(event) => setField("zipCodes", event.target.value)} />
        </label>
        <label className="space-y-1 text-sm font-medium text-slate-700">
          <span>Lease end year</span>
          <Input inputMode="numeric" placeholder="2026" value={draft.leaseEndYear} onChange={(event) => setField("leaseEndYear", event.target.value)} />
        </label>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onClear}>Clear filters</Button>
        <Button type="submit" variant="secondary" className="py-2 px-4">Apply filters</Button>
      </div>
    </form>
  );
}
