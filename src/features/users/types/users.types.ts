import type { User } from "@/shared/types/domain";
import type { UserRole } from "@/shared/types/auth";

export type UserListQuery = {
  companyId?: string;
  search?: string;
  role?: UserRole;
};

export type UpdateUserInput = {
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  isActive?: boolean;
};

export type { User };
