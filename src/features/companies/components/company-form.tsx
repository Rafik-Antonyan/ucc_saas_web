"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCreateCompanyMutation, useUpdateCompanyMutation } from "@/features/companies/api/companies.queries";
import { companyFormSchema, type CompanyFormValues } from "@/features/companies/schemas/companies.schema";
import type { Company } from "@/features/companies/types/companies.types";
import { getErrorMessage } from "@/shared/lib/error";
import { Button, Card, CardContent, FormField, Input } from "@/shared/ui";

function clean(values: CompanyFormValues) {
  return {
    ...values,
    email: values.email || undefined,
    phone: values.phone || undefined,
    stripeCustomerId: values.stripeCustomerId || undefined
  };
}

export function CompanyForm({ company }: { company?: Company }) {
  const router = useRouter();
  const createMutation = useCreateCompanyMutation();
  const updateMutation = useUpdateCompanyMutation(company?.id || "");
  const mutation = company ? updateMutation : createMutation;
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: company?.name || "",
      email: company?.email || "",
      phone: company?.phone || "",
      isActive: company?.isActive ?? true,
      hasNationwideAccess: company?.hasNationwideAccess ?? false,
      stripeCustomerId: company?.stripeCustomerId || ""
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    const saved = company ? await updateMutation.mutateAsync(clean(values)) : await createMutation.mutateAsync(clean(values));
    router.replace(`/companies/${saved.id}`);
  });

  return (
    <Card>
      <CardContent>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
          <FormField label="Name" error={errors.name?.message}>
            <Input {...register("name")} />
          </FormField>
          <FormField label="Email" error={errors.email?.message}>
            <Input type="email" {...register("email")} />
          </FormField>
          <FormField label="Phone" error={errors.phone?.message}>
            <Input {...register("phone")} />
          </FormField>
          <FormField label="Stripe customer ID" error={errors.stripeCustomerId?.message}>
            <Input {...register("stripeCustomerId")} />
          </FormField>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" {...register("isActive")} />
            Active
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" {...register("hasNationwideAccess")} />
            Nationwide access
          </label>
          {mutation.error ? <p className="md:col-span-2 text-sm text-red-600">{getErrorMessage(mutation.error)}</p> : null}
          <div className="md:col-span-2">
            <Button type="submit" isLoading={mutation.isPending}>
              {company ? "Save company" : "Create company"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
