import { FileText } from "lucide-react";
import { collateralDescription, debtorAddress, debtorCity, debtorCounty, debtorPhone, debtorState, debtorZip, fileNumber, securedPartyName } from "@/features/ucc/lib/ucc-record-fields";
import type { UccRecord } from "@/features/ucc/types/ucc.types";
import { formatDate } from "@/shared/lib/format-date";
import { formatPhone } from "@/shared/lib/format-phone";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-sm text-slate-900">{value || "-"}</p>
    </div>
  );
}

export function UccDetailCard({ record }: { record: UccRecord }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle><span className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" aria-hidden="true" /> UCC record information</span></CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <Field label="Filing date" value={formatDate(record.filingDate)} />
        <Field label="File number" value={fileNumber(record)} />
        <Field label="Debtor name" value={record.debtorName} />
        <Field label="Secured party" value={securedPartyName(record)} />
        <Field label="Debtor address" value={debtorAddress(record)} />
        <Field label="City" value={debtorCity(record)} />
        <Field label="State" value={debtorState(record)} />
        <Field label="ZIP code" value={debtorZip(record)} />
        <Field label="County" value={debtorCounty(record)} />
        <Field label="Phone number" value={formatPhone(debtorPhone(record))} />
        <Field label="Lease end date" value={formatDate(record.leaseEndDate)} />
        <div>
          <p className="text-xs font-medium uppercase text-slate-500">Customer status</p>
          <Badge className="mt-1" tone={record.soldClosed || record.isCustomer ? "success" : "default"}>{record.soldClosed || record.isCustomer ? "Closed" : "Lead"}</Badge>
        </div>
        <div className="md:col-span-2">
          <Field label="Collateral" value={collateralDescription(record)} />
        </div>
      </CardContent>
    </Card>
  );
}
