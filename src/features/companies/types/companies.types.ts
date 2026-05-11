import type { Company } from "@/shared/types/domain";

export type CompanyListQuery = {
  search?: string;
};

export type CreateCompanyInput = {
  name: string;
  email?: string;
  phone?: string;
  isActive?: boolean;
  hasNationwideAccess?: boolean;
  stripeCustomerId?: string;
};

export type UpdateCompanyInput = Partial<CreateCompanyInput>;

export type { Company };
