export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  COMPANY_ADMIN = "COMPANY_ADMIN",
  COMPANY_USER = "COMPANY_USER"
}

export type CurrentUser = {
  id: string;
  email: string;
  role: UserRole;
  companyId: string | null;
  firstName?: string | null;
  lastName?: string | null;
  disclaimerAccepted: boolean;
  disclaimerAcceptedAt?: string | null;
  isActive?: boolean;
};

export type AuthSession = {
  accessToken: string;
  user: CurrentUser;
};
