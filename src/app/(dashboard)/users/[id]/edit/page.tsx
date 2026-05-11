"use client";

import { useParams } from "next/navigation";
import { UserForm } from "@/features/users/components/user-form";
import { PageHeader } from "@/shared/ui";

export default function UserEditPage() {
  const params = useParams<{ id: string }>();
  return (
    <>
      <PageHeader title="Edit user" description="Update company user profile and role." />
      <UserForm id={params.id} />
    </>
  );
}
