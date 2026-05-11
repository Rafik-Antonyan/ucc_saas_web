"use client";

import { useParams } from "next/navigation";
import { FollowupDetail } from "@/features/followups/components/followup-detail";

export default function FollowupDetailPage() {
  const params = useParams<{ id: string }>();
  return <FollowupDetail id={params.id} />;
}
