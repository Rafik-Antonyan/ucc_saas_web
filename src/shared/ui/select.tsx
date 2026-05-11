import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "min-h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-emerald-900/10 disabled:cursor-not-allowed disabled:bg-slate-100",
      className
    )}
    {...props}
  >
    {children}
  </select>
));

Select.displayName = "Select";
