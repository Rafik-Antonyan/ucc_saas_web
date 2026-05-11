"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { territoriesApi } from "@/features/territories/api/territories.api";
import type { CreateTerritoryInput, TerritoryListQuery, ToggleNationwideAccessInput } from "@/features/territories/types/territories.types";

export const territoriesQueryKeys = {
  all: ["territories"] as const,
  list: (query?: TerritoryListQuery) => ["territories", "list", query ?? {}] as const,
  company: () => ["territories", "company"] as const,
  adminCompany: (companyId: string) => ["territories", "admin-company", companyId] as const
};

export function useTerritoriesQuery(query?: TerritoryListQuery) {
  return useQuery({ queryKey: territoriesQueryKeys.list(query), queryFn: () => territoriesApi.list(query) });
}

export function useCompanyTerritories() {
  return useQuery({ queryKey: territoriesQueryKeys.company(), queryFn: () => territoriesApi.companySummary() });
}

export function useAdminCompanyTerritories(companyId: string) {
  return useQuery({
    queryKey: territoriesQueryKeys.adminCompany(companyId),
    queryFn: () => territoriesApi.adminCompanySummary(companyId),
    enabled: Boolean(companyId)
  });
}

export function useAddTerritory(companyId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateTerritoryInput) => territoriesApi.addAdminCompanyTerritory(companyId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: territoriesQueryKeys.adminCompany(companyId) });
      queryClient.invalidateQueries({ queryKey: territoriesQueryKeys.all });
    }
  });
}

export function useRemoveTerritory(companyId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (territoryId: string) => territoriesApi.removeAdminCompanyTerritory(companyId, territoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: territoriesQueryKeys.adminCompany(companyId) });
      queryClient.invalidateQueries({ queryKey: territoriesQueryKeys.all });
    }
  });
}

export function useToggleNationwideAccess(companyId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: ToggleNationwideAccessInput) => territoriesApi.toggleNationwideAccess(companyId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: territoriesQueryKeys.adminCompany(companyId) });
      queryClient.invalidateQueries({ queryKey: territoriesQueryKeys.all });
    }
  });
}
