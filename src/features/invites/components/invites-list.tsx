"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useInvitesQuery } from "@/features/invites/api/invites.queries";
import type { Invite } from "@/features/invites/types/invites.types";
import { Badge, DataTable, type DataTableColumn, ErrorState, LoadingState, PageHeader } from "@/shared/ui";

function statusTone(status: Invite["status"]) {
  if (status === "ACCEPTED") return "success" as const;
  if (status === "EXPIRED") return "danger" as const;
  return "warning" as const;
}

export function InvitesList() {
  const invitesQuery = useInvitesQuery();
  const columns: DataTableColumn<Invite>[] = [
    { key: "email", header: "Email", render: (invite) => invite.email },
    { key: "role", header: "Role", render: (invite) => invite.role.replace("_", " ") },
    { key: "status", header: "Status", render: (invite) => <Badge tone={statusTone(invite.status)}>{invite.status}</Badge> },
    { key: "expires", header: "Expires", render: (invite) => new Date(invite.expiresAt).toLocaleDateString() }
  ];

  return (
    <>
      <PageHeader
        title="Invites"
        description="Invite-only onboarding for company admins and users."
        action={
          <Link className="inline-flex min-h-10 items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800" href="/invites/create">
            <Plus className="h-4 w-4" />
            New invite
          </Link>
        }
      />
      {invitesQuery.isLoading ? <LoadingState /> : null}
      {invitesQuery.error ? <ErrorState error={invitesQuery.error} /> : null}
      {invitesQuery.data ? <DataTable data={invitesQuery.data} columns={columns} emptyTitle="No invites yet" /> : null}
    </>
  );
}
