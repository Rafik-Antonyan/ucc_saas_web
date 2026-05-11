"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAcceptDisclaimerMutation } from "@/features/auth/api/auth.queries";
import { DISCLAIMER_TEXT } from "@/features/disclaimer/constants";
import { disclaimerSchema, type DisclaimerFormValues } from "@/features/disclaimer/schemas/disclaimer.schema";
import { getErrorMessage } from "@/shared/lib/error";
import { Button, Card, CardContent, CardHeader, CardTitle, FormField } from "@/shared/ui";

export function DisclaimerForm() {
  const router = useRouter();
  const acceptMutation = useAcceptDisclaimerMutation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<DisclaimerFormValues>({
    resolver: zodResolver(disclaimerSchema),
    defaultValues: { accepted: false }
  });

  const onSubmit = handleSubmit(async () => {
    await acceptMutation.mutateAsync();
    router.replace("/dashboard");
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Data disclaimer</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={onSubmit}>
          <p className="rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-700">{DISCLAIMER_TEXT}</p>
          <FormField label="Acknowledgement" error={errors.accepted?.message}>
            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input className="mt-1 h-4 w-4 rounded border-slate-300 text-primary" type="checkbox" {...register("accepted")} />
              <span>I accept this disclaimer and understand the limitation of the data.</span>
            </label>
          </FormField>
          {acceptMutation.error ? <p className="text-sm text-red-600">{getErrorMessage(acceptMutation.error)}</p> : null}
          <Button type="submit" isLoading={acceptMutation.isPending}>
            Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
