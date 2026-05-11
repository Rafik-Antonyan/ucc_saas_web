import { UccLeadDetailPage } from "@/features/ucc/components/UccLeadDetailPage";

export function UccDetail({ id }: { id: string }) {
  return <UccLeadDetailPage id={id} admin />;
}
