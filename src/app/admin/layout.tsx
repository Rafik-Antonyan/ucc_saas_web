import type { ReactNode } from "react";
import { RoleGuard } from "@/features/auth/components/role-guard";
import { UserRole } from "@/shared/types/auth";
import { DashboardLayout } from "@/widgets/dashboard-layout/dashboard-layout";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout>
      <RoleGuard roles={[UserRole.SUPER_ADMIN]}>{children}</RoleGuard>
    </DashboardLayout>
  );
}
