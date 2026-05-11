"use client";

import { useParams } from "next/navigation";
import { CompanyDetail } from "@/features/companies/components/company-detail";

export default function CompanyDetailPage() {
  const params = useParams<{ id: string }>();
  return <CompanyDetail id={params.id} />;
}
