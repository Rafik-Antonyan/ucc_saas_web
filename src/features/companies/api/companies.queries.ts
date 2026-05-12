"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { companiesApi } from "@/features/companies/api/companies.api";
import type { CompanyListQuery, CreateCompanyInput, UpdateCompanyInput } from "@/features/companies/types/companies.types";

export const companiesQueryKeys = {
  all: ["companies"] as const,
  list: (query?: CompanyListQuery) => ["companies", "list", query ?? {}] as const,
  detail: (id: string) => ["companies", "detail", id] as const
};

export function useCompaniesQuery(query?: CompanyListQuery, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: companiesQueryKeys.list(query),
    queryFn: () => companiesApi.list(query),
    enabled: options?.enabled ?? true
  });
}

export function useCompanyQuery(id: string) {
  return useQuery({ queryKey: companiesQueryKeys.detail(id), queryFn: () => companiesApi.getById(id), enabled: Boolean(id) });
}

export function useCreateCompanyMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateCompanyInput) => companiesApi.create(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: companiesQueryKeys.all })
  });
}

export function useUpdateCompanyMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateCompanyInput) => companiesApi.update(id, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: companiesQueryKeys.all });
      void queryClient.invalidateQueries({ queryKey: companiesQueryKeys.detail(id) });
    }
  });
}

export function useDeactivateCompanyMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => companiesApi.deactivate(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: companiesQueryKeys.all })
  });
}
