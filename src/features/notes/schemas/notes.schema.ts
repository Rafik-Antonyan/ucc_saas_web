import { z } from "zod";

export const noteCreateSchema = z.object({
  body: z.string().trim().min(1, "Note is required").max(5000)
});
