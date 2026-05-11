import { InviteForm } from "@/features/invites/components/invite-form";
import { PageHeader } from "@/shared/ui";

export default function CreateInvitePage() {
  return (
    <>
      <PageHeader title="Create invite" description="Invite a user without enabling self-registration." />
      <InviteForm />
    </>
  );
}
