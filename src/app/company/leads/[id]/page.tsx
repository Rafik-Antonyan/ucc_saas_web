"use client";

import { useParams } from "next/navigation";
import { UccLeadDetailPage } from "@/features/ucc/components/UccLeadDetailPage";

export default function CompanyLeadDetailRoute() {
  const params = useParams<{ id: string }>();
  return <UccLeadDetailPage id={params.id} />;
}
