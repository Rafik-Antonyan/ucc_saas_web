import type { HTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

type BadgeTone = "default" | "success" | "warning" | "danger" | "info";

const tones: Record<BadgeTone, string> = {
  default: "bg-slate-100 text-slate-700",
  success: "bg-emerald-100 text-emerald-800",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-red-100 text-red-800",
  info: "bg-cyan-100 text-cyan-800"
};

export function Badge({ className, tone = "default", ...props }: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return <span className={cn("inline-flex items-center rounded px-2 py-1 text-xs font-medium", tones[tone], className)} {...props} />;
}
