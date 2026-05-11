"use client";

import { useParams } from "next/navigation";
import { AdminUccRecordPage } from "@/features/ucc/components/AdminUccRecordPage";

export default function AdminUccEditRoute() {
  const params = useParams<{ id: string }>();
  return <AdminUccRecordPage id={params.id} />;
}
