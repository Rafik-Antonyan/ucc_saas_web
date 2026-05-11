import { z } from "zod";

export const territoryFiltersSchema = z.object({
  type: z.enum(["STATE", "COUNTY", "ZIP"]).optional()
});
