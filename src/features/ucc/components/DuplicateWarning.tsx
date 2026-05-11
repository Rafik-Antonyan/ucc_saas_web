import { AlertTriangle } from "lucide-react";
import type { UccDuplicateWarning as Warning } from "@/features/ucc/types/ucc.types";

export function DuplicateWarning({ warning }: { warning?: Warning | null }) {
  if (!warning) return null;

  return (
    <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <div>
          <p className="font-semibold">Possible duplicate UCC record</p>
          <dl className="mt-2 grid gap-1 sm:grid-cols-2">
            <div><dt className="text-xs uppercase text-amber-700">Debtor</dt><dd>{warning.matchingDebtorName || "-"}</dd></div>
            <div><dt className="text-xs uppercase text-amber-700">Address</dt><dd>{warning.matchingAddress || "-"}</dd></div>
            <div><dt className="text-xs uppercase text-amber-700">Secured party</dt><dd>{warning.matchingSecuredParty || "-"}</dd></div>
            <div><dt className="text-xs uppercase text-amber-700">File number</dt><dd>{warning.matchingFileNumber || "-"}</dd></div>
          </dl>
          <p className="mt-2">{warning.message || "Different filing dates can still be valid; the backend is only flagging a possible match."}</p>
        </div>
      </div>
    </div>
  );
}
