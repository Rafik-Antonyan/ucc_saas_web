import { CompanyForm } from "@/features/companies/components/company-form";
import { PageHeader } from "@/shared/ui";

export default function CreateCompanyPage() {
  return (
    <>
      <PageHeader title="Create company" description="Create a new tenant. Company IDs are only supplied by super admin workflows." />
      <CompanyForm />
    </>
  );
}
