"use client";

import { useRouter } from "next/navigation";
import { UccForm } from "@/features/ucc/components/UccForm";
import { useCreateUccRecordMutation } from "@/features/ucc/api/ucc.queries";
import type { UccFormInput } from "@/features/ucc/types/ucc.types";
import { useCompaniesQuery } from "@/features/companies/api/companies.queries";
import { PageHeader } from "@/shared/ui";

export function NewUccRecordPage() {
  const router = useRouter();
  const createMutation = useCreateUccRecordMutation();
  const companiesQuery = useCompaniesQuery();
  const activeCompanies = companiesQuery.data?.filter((company) => company.isActive) ?? [];

  async function handleSubmit(input: UccFormInput) {
    await createMutation.mutateAsync(input);
    router.push("/admin/ucc");
  }

  return (
    <>
      <PageHeader title="Create UCC record" description="Create a backend-owned UCC record. Duplicate detection is returned by the API." />
      <UccForm
        companyOptions={activeCompanies}
        isCompanyLoading={companiesQuery.isLoading}
        companyError={companiesQuery.error}
        title="New UCC record"
        submitLabel="Create record"
        isSubmitting={createMutation.isPending}
        error={createMutation.error}
        onSubmit={handleSubmit}
      />
    </>
  );
}
