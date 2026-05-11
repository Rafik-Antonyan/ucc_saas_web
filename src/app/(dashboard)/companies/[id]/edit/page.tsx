"use client";

import { useParams } from "next/navigation";
import { CompanyEditLoader } from "@/features/companies/components/company-edit-loader";
import { PageHeader } from "@/shared/ui";

export default function CompanyEditPage() {
  const params = useParams<{ id: string }>();
  return (
    <>
      <PageHeader title="Edit company" description="Update tenant profile and access flags." />
      <CompanyEditLoader id={params.id} />
    </>
  );
}
