import { InviteForm } from "@/features/invites/components/invite-form";
import { PageHeader } from "@/shared/ui";
import { UserRole } from "@/shared/types/auth";

export default function CreateUserPage() {
  return (
    <>
      <PageHeader title="Invite user" description="Users are created through the invite-only onboarding flow." />
      <InviteForm defaultRole={UserRole.COMPANY_USER} />
    </>
  );
}
