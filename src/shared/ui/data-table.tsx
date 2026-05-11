import type { ReactNode } from "react";
import { EmptyState } from "@/shared/ui/empty-state";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";

export type DataTableColumn<T> = {
  key: string;
  header: ReactNode;
  className?: string;
  render: (row: T) => ReactNode;
};

export function DataTable<T extends { id?: string }>({
  data,
  columns,
  emptyTitle = "No records found",
  onRowClick
}: {
  data: T[];
  columns: DataTableColumn<T>[];
  emptyTitle?: string;
  onRowClick?: (row: T) => void;
}) {
  if (data.length === 0) return <EmptyState title={emptyTitle} />;

  return (
    <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableHeader key={column.key} className={column.className}>
                  {column.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={row.id ?? index}
                className={onRowClick ? "cursor-pointer hover:bg-slate-50" : undefined}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {columns.map((column) => (
                  <TableCell key={column.key} className={column.className}>
                    {column.render(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
