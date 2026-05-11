import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthRedirect } from "@/features/auth/components/auth-redirect";
import { LoginForm } from "@/features/auth/components/login-form";
import { LoadingState } from "@/shared/ui";

export const metadata: Metadata = {
  title: "Sign in | UCC SaaS"
};

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <AuthRedirect>
        <LoginForm />
      </AuthRedirect>
    </Suspense>
  );
}
