"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation, useUserQuery } from "@/features/users/api/users.queries";
import { userUpdateSchema, type UserUpdateFormValues } from "@/features/users/schemas/users.schema";
import { getErrorMessage } from "@/shared/lib/error";
import { UserRole } from "@/shared/types/auth";
import { Button, Card, CardContent, ErrorState, FormField, Input, LoadingState, Select } from "@/shared/ui";

export function UserForm({ id }: { id: string }) {
  const router = useRouter();
  const userQuery = useUserQuery(id);
  const updateMutation = useUpdateUserMutation(id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UserUpdateFormValues>({ resolver: zodResolver(userUpdateSchema) });

  useEffect(() => {
    if (!userQuery.data) return;
    const user = userQuery.data;
    reset({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      role: user.role === UserRole.SUPER_ADMIN ? UserRole.COMPANY_ADMIN : user.role,
      isActive: user.isActive ?? true
    });
  }, [reset, userQuery.data]);

  if (userQuery.isLoading) return <LoadingState />;
  if (userQuery.error) return <ErrorState error={userQuery.error} />;

  const onSubmit = handleSubmit(async (values) => {
    const saved = await updateMutation.mutateAsync({
      ...values,
      firstName: values.firstName || undefined,
      lastName: values.lastName || undefined
    });
    router.replace(`/users/${saved.id}`);
  });

  return (
    <Card>
      <CardContent>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
          <FormField label="First name" error={errors.firstName?.message}>
            <Input {...register("firstName")} />
          </FormField>
          <FormField label="Last name" error={errors.lastName?.message}>
            <Input {...register("lastName")} />
          </FormField>
          <FormField label="Role" error={errors.role?.message}>
            <Select {...register("role")}>
              <option value={UserRole.COMPANY_ADMIN}>Company admin</option>
              <option value={UserRole.COMPANY_USER}>Company user</option>
            </Select>
          </FormField>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" {...register("isActive")} />
            Active
          </label>
          {updateMutation.error ? <p className="md:col-span-2 text-sm text-red-600">{getErrorMessage(updateMutation.error)}</p> : null}
          <div className="md:col-span-2">
            <Button type="submit" isLoading={updateMutation.isPending}>
              Save user
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
