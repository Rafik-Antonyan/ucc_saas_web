import { z } from "zod";
import { UserRole } from "@/shared/types/auth";

export const userUpdateSchema = z.object({
  firstName: z.string().trim().min(1).max(100).optional().or(z.literal("")),
  lastName: z.string().trim().min(1).max(100).optional().or(z.literal("")),
  role: z.enum([UserRole.COMPANY_ADMIN, UserRole.COMPANY_USER]),
  isActive: z.boolean().default(true)
});

export type UserUpdateFormValues = z.infer<typeof userUpdateSchema>;
