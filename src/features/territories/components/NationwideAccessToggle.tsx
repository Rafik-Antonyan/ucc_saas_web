"use client";

import { Button } from "@/shared/ui";

export function NationwideAccessToggle({
  enabled,
  isSubmitting = false,
  onToggle
}: {
  enabled: boolean;
  isSubmitting?: boolean;
  onToggle: (enabled: boolean) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-slate-200 p-4">
      <div>
        <p className="text-sm font-medium text-slate-900">Nationwide access</p>
        <p className="text-sm text-slate-600">{enabled ? "This company can access all UCC records." : "This company is limited to assigned territories."}</p>
      </div>
      <Button type="button" variant={enabled ? "danger" : "secondary"} isLoading={isSubmitting} onClick={() => onToggle(!enabled)}>
        {enabled ? "Disable" : "Enable"}
      </Button>
    </div>
  );
}
