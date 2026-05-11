import { api } from "@/shared/api/client";
import { endpoints } from "@/shared/api/endpoints";
import type { CreateTerritoryInput, Territory, TerritoryListQuery, TerritorySummary, ToggleNationwideAccessInput } from "@/features/territories/types/territories.types";

export const territoriesApi = {
  list: (params?: TerritoryListQuery) => api.get<Territory[]>(endpoints.territories.base, { params }),
  companySummary: () => api.get<TerritorySummary>(endpoints.territories.company),
  adminCompanySummary: (companyId: string) => api.get<TerritorySummary>(endpoints.territories.adminCompany(companyId)),
  addAdminCompanyTerritory: (companyId: string, input: CreateTerritoryInput) =>
    api.post<Territory, CreateTerritoryInput>(endpoints.territories.adminCompany(companyId), input),
  removeAdminCompanyTerritory: (companyId: string, territoryId: string) =>
    api.delete<Territory>(endpoints.territories.adminCompanyTerritory(companyId, territoryId)),
  toggleNationwideAccess: (companyId: string, input: ToggleNationwideAccessInput) =>
    api.patch<TerritorySummary, ToggleNationwideAccessInput>(endpoints.territories.adminCompanyNationwideAccess(companyId), input)
};
