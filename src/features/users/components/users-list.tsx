"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useUsersQuery } from "@/features/users/api/users.queries";
import type { User } from "@/features/users/types/users.types";
import { Badge, DataTable, type DataTableColumn, ErrorState, LoadingState, PageHeader } from "@/shared/ui";

export function UsersList() {
  const usersQuery = useUsersQuery();
  const columns: DataTableColumn<User>[] = [
    { key: "email", header: "Email", render: (user) => <Link className="font-medium text-primary" href={`/users/${user.id}`}>{user.email}</Link> },
    { key: "name", header: "Name", render: (user) => [user.firstName, user.lastName].filter(Boolean).join(" ") || "-" },
    { key: "role", header: "Role", render: (user) => <Badge tone="info">{user.role.replace("_", " ")}</Badge> },
    { key: "status", header: "Status", render: (user) => <Badge tone={user.isActive === false ? "danger" : "success"}>{user.isActive === false ? "Inactive" : "Active"}</Badge> }
  ];

  return (
    <>
      <PageHeader
        title="Users"
        description="Company-scoped user management."
        action={
          <Link className="inline-flex min-h-10 items-center gap-2 px-4 py-2 rounded-md bg-primary text-sm font-medium text-white hover:bg-emerald-800" href="/users/create">
            <Plus className="h-4 w-4" />
            Invite user
          </Link>
        }
      />
      {usersQuery.isLoading ? <LoadingState /> : null}
      {usersQuery.error ? <ErrorState error={usersQuery.error} /> : null}
      {usersQuery.data ? <DataTable data={usersQuery.data} columns={columns} emptyTitle="No users found" /> : null}
    </>
  );
}
