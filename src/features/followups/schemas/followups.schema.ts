import { z } from "zod";

export const followupFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(255),
  dueAt: z.string().min(1, "Due date is required"),
  assignedToId: z.string().optional()
});
