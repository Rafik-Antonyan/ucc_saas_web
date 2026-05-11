import { AlertTriangle } from "lucide-react";
import { getErrorMessage } from "@/shared/lib/error";

export function ErrorState({ error }: { error: unknown }) {
  return (
    <div className="flex min-h-32 items-center gap-3 rounded-md border border-red-200 bg-red-50 p-5 text-sm text-red-800">
      <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span>{getErrorMessage(error)}</span>
    </div>
  );
}
