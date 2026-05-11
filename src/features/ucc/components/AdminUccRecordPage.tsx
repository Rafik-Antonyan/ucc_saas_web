"use client";

import { useRouter } from "next/navigation";
import { UccForm } from "@/features/ucc/components/UccForm";
import { useUccRecordQuery, useUpdateUccRecordMutation } from "@/features/ucc/api/ucc.queries";
import type { UccFormInput } from "@/features/ucc/types/ucc.types";
import { ErrorState, LoadingState, PageHeader } from "@/shared/ui";

export function AdminUccRecordPage({ id }: { id: string }) {
  const router = useRouter();
  const recordQuery = useUccRecordQuery(id);
  const updateMutation = useUpdateUccRecordMutation(id);

  async function handleSubmit(input: UccFormInput) {
    await updateMutation.mutateAsync(input);
    router.push("/admin/ucc");
  }

  if (recordQuery.isLoading) return <LoadingState />;
  if (recordQuery.error) return <ErrorState error={recordQuery.error} />;
  if (!recordQuery.data) return <ErrorState error={{ message: "UCC record was not found." }} />;

  return (
    <>
      <PageHeader title="Edit UCC record" description="SUPER_ADMIN record maintenance." />
      <UccForm
        record={recordQuery.data}
        title="Edit UCC record"
        submitLabel="Save changes"
        isSubmitting={updateMutation.isPending}
        error={updateMutation.error}
        onSubmit={handleSubmit}
      />
    </>
  );
}
