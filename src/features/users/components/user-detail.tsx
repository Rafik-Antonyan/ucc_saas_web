"use client";

import Link from "next/link";
import { useUserQuery } from "@/features/users/api/users.queries";
import { Badge, Button, Card, CardContent, ErrorState, LoadingState, PageHeader } from "@/shared/ui";

export function UserDetail({ id }: { id: string }) {
  const userQuery = useUserQuery(id);
  if (userQuery.isLoading) return <LoadingState />;
  if (userQuery.error) return <ErrorState error={userQuery.error} />;
  if (!userQuery.data) return null;

  const user = userQuery.data;
  return (
    <>
      <PageHeader title={user.email} description="User profile and access." action={<Button variant="secondary"><Link href={`/users/${user.id}/edit`}>Edit</Link></Button>} />
      <Card>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div><p className="text-xs uppercase text-slate-500">Name</p><p className="text-sm">{[user.firstName, user.lastName].filter(Boolean).join(" ") || "-"}</p></div>
          <div><p className="text-xs uppercase text-slate-500">Role</p><Badge tone="info">{user.role.replace("_", " ")}</Badge></div>
          <div><p className="text-xs uppercase text-slate-500">Status</p><Badge tone={user.isActive === false ? "danger" : "success"}>{user.isActive === false ? "Inactive" : "Active"}</Badge></div>
          <div><p className="text-xs uppercase text-slate-500">Disclaimer</p><Badge tone={user.disclaimerAccepted ? "success" : "warning"}>{user.disclaimerAccepted ? "Accepted" : "Pending"}</Badge></div>
        </CardContent>
      </Card>
    </>
  );
}
