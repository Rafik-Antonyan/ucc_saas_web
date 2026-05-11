import { z } from "zod";

export const uccFiltersSchema = z.object({
  search: z.string().optional(),
  state: z.string().optional(),
  county: z.string().optional()
});

export type UccFilters = z.infer<typeof uccFiltersSchema>;
