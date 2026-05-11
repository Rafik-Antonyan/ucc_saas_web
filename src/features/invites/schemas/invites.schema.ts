import { z } from "zod";
import { UserRole } from "@/shared/types/auth";

export const inviteCreateSchema = z.object({
  email: z.string().email("Enter a valid email address").transform((email) => email.toLowerCase()),
  role: z.enum([UserRole.COMPANY_ADMIN, UserRole.COMPANY_USER, UserRole.SUPER_ADMIN]),
  companyId: z.string().optional(),
  expiresInDays: z.coerce.number().int().positive().max(30).default(7)
});

export const inviteAcceptSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  password: z.string().min(8, "Password must be at least 8 characters").max(128)
});

export type InviteCreateFormValues = z.infer<typeof inviteCreateSchema>;
export type InviteAcceptFormValues = z.infer<typeof inviteAcceptSchema>;
