"use client";

import { Trash2 } from "lucide-react";
import { TerritoryBadge } from "@/features/territories/components/TerritoryBadge";
import type { Territory } from "@/features/territories/types/territories.types";
import { Button, DataTable, type DataTableColumn } from "@/shared/ui";

export function TerritoryList({
  territories,
  onRemove,
  isRemoving = false
}: {
  territories: Territory[];
  onRemove?: (territory: Territory) => void;
  isRemoving?: boolean;
}) {
  const columns: DataTableColumn<Territory>[] = [
    { key: "type", header: "Type", render: (territory) => <TerritoryBadge territory={territory} /> },
    { key: "value", header: "Value", render: (territory) => territory.value },
    { key: "label", header: "Label", render: (territory) => territory.label || "-" }
  ];

  if (onRemove) {
    columns.push({
      key: "actions",
      header: "Actions",
      className: "w-[100px]",
      render: (territory) => (
        <Button type="button" variant="ghost" className="h-9 w-9 p-0 text-red-700" disabled={isRemoving} onClick={() => onRemove(territory)} aria-label="Remove territory">
          <Trash2 className="h-4 w-4" />
        </Button>
      )
    });
  }

  return <DataTable data={territories} columns={columns} emptyTitle="No territories are assigned to your company yet." />;
}
