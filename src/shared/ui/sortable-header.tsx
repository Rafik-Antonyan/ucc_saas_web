"use client";

import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { Button } from "@/shared/ui/button";

export function SortableHeader<T extends string>({
  field,
  label,
  sortBy,
  sortDirection,
  onSort
}: {
  field: T;
  label: string;
  sortBy?: T;
  sortDirection?: "asc" | "desc";
  onSort: (field: T) => void;
}) {
  const active = sortBy === field;
  const Icon = !active ? ChevronsUpDown : sortDirection === "asc" ? ArrowUp : ArrowDown;

  return (
    <Button
      type="button"
      variant="ghost"
      className="min-h-0 px-0 py-0 text-xs font-semibold uppercase text-slate-500 hover:bg-transparent"
      onClick={() => onSort(field)}
    >
      <span>{label}</span>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
    </Button>
  );
}
