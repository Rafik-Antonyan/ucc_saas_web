import { z } from "zod";

export const billingFiltersSchema = z.object({
  status: z.string().optional()
});
