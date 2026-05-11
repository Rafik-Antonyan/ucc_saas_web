"use client";

import { useParams } from "next/navigation";
import { AcceptInviteForm } from "@/features/invites/components/accept-invite-form";

export default function InviteAcceptPage() {
  const params = useParams<{ token: string }>();
  return <AcceptInviteForm token={params.token} />;
}
