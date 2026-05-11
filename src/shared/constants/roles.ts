import { UserRole } from "@/shared/types/auth";

export const ALL_ROLES = [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.COMPANY_USER] as const;

export const ADMIN_ROLES = [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN] as const;
