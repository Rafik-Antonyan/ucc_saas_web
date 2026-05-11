import type { UserRole } from "@/shared/types/auth";
import type { Invite, InviteStatus, PublicInvite } from "@/shared/types/domain";

export type InviteListQuery = {
  status?: InviteStatus;
  companyId?: string;
};

export type CreateInviteInput = {
  email: string;
  role: UserRole;
  companyId?: string;
  expiresInDays?: number;
};

export type AcceptInviteInput = {
  firstName: string;
  lastName: string;
  password: string;
};

export type { Invite, InviteStatus, PublicInvite };
