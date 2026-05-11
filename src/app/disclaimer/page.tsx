import type { Metadata } from "next";
import { AuthGuard } from "@/features/auth/components/auth-guard";
import { DisclaimerForm } from "@/features/disclaimer/components/disclaimer-form";

export const metadata: Metadata = {
  title: "Disclaimer | UCC SaaS"
};

export default function DisclaimerPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface p-4">
      <AuthGuard>
        <DisclaimerForm />
      </AuthGuard>
    </main>
  );
}
