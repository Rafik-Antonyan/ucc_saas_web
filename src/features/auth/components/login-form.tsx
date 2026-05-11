"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/features/auth/api/auth.queries";
import { loginSchema, type LoginFormValues } from "@/features/auth/schemas/auth.schema";
import { getErrorMessage } from "@/shared/lib/error";
import { Button, Card, CardContent, CardHeader, CardTitle, FormField, Input } from "@/shared/ui";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginMutation = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = handleSubmit(async (values) => {
    const session = await loginMutation.mutateAsync(values);
    const next = searchParams.get("next");
    router.replace(session.user.disclaimerAccepted ? next || "/dashboard" : "/disclaimer");
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <FormField label="Email" error={errors.email?.message}>
            <Input autoComplete="email" type="email" {...register("email")} />
          </FormField>
          <FormField label="Password" error={errors.password?.message}>
            <Input autoComplete="current-password" type="password" {...register("password")} />
          </FormField>
          {loginMutation.error ? <p className="text-sm text-red-600">{getErrorMessage(loginMutation.error)}</p> : null}
          <Button className="w-full" type="submit" isLoading={loginMutation.isPending}>
            Sign in
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
