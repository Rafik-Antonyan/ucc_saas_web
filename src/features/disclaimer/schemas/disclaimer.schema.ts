import { z } from "zod";

export const disclaimerSchema = z.object({
  accepted: z.boolean().refine((value) => value, "You must accept the disclaimer to continue.")
});

export type DisclaimerFormValues = z.infer<typeof disclaimerSchema>;
