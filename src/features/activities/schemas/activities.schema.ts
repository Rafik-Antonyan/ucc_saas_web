import { z } from "zod";

export const activityFiltersSchema = z.object({
  uccRecordId: z.string().optional(),
  type: z.enum(["NOTE_ADDED", "FOLLOW_UP_CREATED", "PROPOSAL_SENT", "CUSTOMER_CLOSED", "EXPORT_PURCHASED"]).optional()
});
