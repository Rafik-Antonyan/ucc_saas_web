import { z } from "zod";

export const alertSummarySchema = z.object({
  overdueFollowUps: z.number()
});
