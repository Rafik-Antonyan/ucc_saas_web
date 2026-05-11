import type { Territory } from "@/shared/types/domain";

export type TerritoryListQuery = {
  type?: Territory["type"];
  companyId?: string;
};

export type TerritorySummary = {
  id: string;
  hasNationwideAccess: boolean;
  territories: Territory[];
};

export type CreateTerritoryInput = {
  type: Territory["type"];
  value: string;
  label?: string;
};

export type ToggleNationwideAccessInput = {
  hasNationwideAccess: boolean;
};

export type { Territory };
