import { z } from "zod";

export const companyFormSchema = z.object({
  name: z.string().trim().min(1, "Company name is required").max(255),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  phone: z.string().trim().max(50).optional(),
  isActive: z.boolean().default(true),
  hasNationwideAccess: z.boolean().default(false),
  stripeCustomerId: z.string().trim().max(255).optional()
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;
