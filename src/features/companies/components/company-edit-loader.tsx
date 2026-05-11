"use client";

import { useCompanyQuery } from "@/features/companies/api/companies.queries";
import { CompanyForm } from "@/features/companies/components/company-form";
import { ErrorState, LoadingState } from "@/shared/ui";

export function CompanyEditLoader({ id }: { id: string }) {
  const companyQuery = useCompanyQuery(id);
  if (companyQuery.isLoading) return <LoadingState />;
  if (companyQuery.error) return <ErrorState error={companyQuery.error} />;
  return companyQuery.data ? <CompanyForm company={companyQuery.data} /> : null;
}
