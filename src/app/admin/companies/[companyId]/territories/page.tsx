import { AdminCompanyTerritoriesPage } from "@/features/territories/components/AdminCompanyTerritoriesPage";

export default async function AdminCompanyTerritoriesRoute({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  return <AdminCompanyTerritoriesPage companyId={companyId} />;
}
