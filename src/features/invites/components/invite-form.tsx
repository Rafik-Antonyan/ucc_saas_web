"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCreateInviteMutation } from "@/features/invites/api/invites.queries";
import { inviteCreateSchema, type InviteCreateFormValues } from "@/features/invites/schemas/invites.schema";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useCompaniesQuery } from "@/features/companies/api/companies.queries";
import { getErrorMessage } from "@/shared/lib/error";
import { isSuperAdmin } from "@/shared/lib/rbac";
import { UserRole } from "@/shared/types/auth";
import { Button, Card, CardContent, FormField, Input, Select } from "@/shared/ui";

export function InviteForm({ defaultRole = UserRole.COMPANY_USER }: { defaultRole?: UserRole }) {
  const router = useRouter();
  const { user } = useAuth();
  const createMutation = useCreateInviteMutation();
  const isSuper = isSuperAdmin(user);
  const companiesQuery = useCompaniesQuery(undefined, { enabled: isSuper });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<InviteCreateFormValues>({
    resolver: zodResolver(inviteCreateSchema),
    defaultValues: { email: "", role: defaultRole, expiresInDays: 7, companyId: "" }
  });

  const onSubmit = handleSubmit(async (values) => {
    await createMutation.mutateAsync({
      ...values,
      companyId: isSuper ? values.companyId || undefined : undefined
    });
    router.replace("/invites");
  });

  const companies = companiesQuery.data ?? [];

  return (
    <Card>
      <CardContent>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
          <FormField label="Email" error={errors.email?.message}>
            <Input type="email" {...register("email")} />
          </FormField>
          <FormField label="Role" error={errors.role?.message}>
            <Select {...register("role")}>
              {isSuper ? <option value={UserRole.SUPER_ADMIN}>Super admin</option> : null}
              <option value={UserRole.COMPANY_ADMIN}>Company admin</option>
              <option value={UserRole.COMPANY_USER}>Company user</option>
            </Select>
          </FormField>
          {isSuper ? (
            <FormField label="Company" error={errors.companyId?.message}>
              <Select {...register("companyId")} disabled={companiesQuery.isLoading}>
                <option value="">
                  {companiesQuery.isLoading ? "Loading companies..." : "Select a company"}
                </option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </Select>
            </FormField>
          ) : null}
          <FormField label="Expires in days" error={errors.expiresInDays?.message}>
            <Input type="number" min={1} max={30} {...register("expiresInDays")} />
          </FormField>
          {createMutation.error ? <p className="md:col-span-2 px-4 py-2 text-sm text-red-600">{getErrorMessage(createMutation.error)}</p> : null}
          <div className="md:col-span-2">
            <Button type="submit" isLoading={createMutation.isPending}>
              Create invite
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
