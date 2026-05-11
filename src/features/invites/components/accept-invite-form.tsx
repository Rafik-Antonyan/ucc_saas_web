"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAcceptInviteMutation, usePublicInviteQuery } from "@/features/invites/api/invites.queries";
import { inviteAcceptSchema, type InviteAcceptFormValues } from "@/features/invites/schemas/invites.schema";
import { getErrorMessage } from "@/shared/lib/error";
import { Button, Card, CardContent, CardHeader, CardTitle, ErrorState, FormField, Input, LoadingState } from "@/shared/ui";

export function AcceptInviteForm({ token }: { token: string }) {
  const router = useRouter();
  const inviteQuery = usePublicInviteQuery(token);
  const acceptMutation = useAcceptInviteMutation(token);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<InviteAcceptFormValues>({
    resolver: zodResolver(inviteAcceptSchema),
    defaultValues: { firstName: "", lastName: "", password: "" }
  });

  const onSubmit = handleSubmit(async (values) => {
    const session = await acceptMutation.mutateAsync(values);
    router.replace(session.user.disclaimerAccepted ? "/dashboard" : "/disclaimer");
  });

  if (inviteQuery.isLoading) return <LoadingState label="Loading invite..." />;
  if (inviteQuery.error) return <ErrorState error={inviteQuery.error} />;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Accept invite</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-slate-600">Complete setup for {inviteQuery.data?.email}.</p>
        <form className="space-y-4" onSubmit={onSubmit}>
          <FormField label="First name" error={errors.firstName?.message}>
            <Input {...register("firstName")} />
          </FormField>
          <FormField label="Last name" error={errors.lastName?.message}>
            <Input {...register("lastName")} />
          </FormField>
          <FormField label="Password" error={errors.password?.message}>
            <Input type="password" autoComplete="new-password" {...register("password")} />
          </FormField>
          {acceptMutation.error ? <p className="text-sm text-red-600">{getErrorMessage(acceptMutation.error)}</p> : null}
          <Button className="w-full" type="submit" isLoading={acceptMutation.isPending}>
            Create account
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
