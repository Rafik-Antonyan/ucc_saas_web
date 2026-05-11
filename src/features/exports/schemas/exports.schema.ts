import { z } from "zod";

export const exportFiltersSchema = z.object({
  status: z.string().optional()
});
