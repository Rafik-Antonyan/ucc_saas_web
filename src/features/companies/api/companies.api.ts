import { api } from "@/shared/api/client";
import { endpoints } from "@/shared/api/endpoints";
import type { Company, CompanyListQuery, CreateCompanyInput, UpdateCompanyInput } from "@/features/companies/types/companies.types";

export const companiesApi = {
  list: (params?: CompanyListQuery) => api.get<Company[]>(endpoints.companies.base, { params }),
  getById: (id: string) => api.get<Company>(endpoints.companies.byId(id)),
  create: (input: CreateCompanyInput) => api.post<Company, CreateCompanyInput>(endpoints.companies.base, input),
  update: (id: string, input: UpdateCompanyInput) => api.patch<Company, UpdateCompanyInput>(endpoints.companies.byId(id), input),
  deactivate: (id: string) => api.delete<Company>(endpoints.companies.byId(id))
};
