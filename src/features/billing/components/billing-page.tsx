"use client";

import { useBillingSubscriptionsQuery } from "@/features/billing/api/billing.queries";
import type { BillingSubscription } from "@/features/billing/types/billing.types";
import { Badge, DataTable, type DataTableColumn, ErrorState, LoadingState, PageHeader } from "@/shared/ui";

export function BillingPage() {
  const billingQuery = useBillingSubscriptionsQuery();
  const columns: DataTableColumn<BillingSubscription>[] = [
    { key: "plan", header: "Plan", render: (subscription) => subscription.plan },
    { key: "provider", header: "Provider", render: (subscription) => subscription.provider },
    { key: "status", header: "Status", render: (subscription) => <Badge tone={subscription.status === "active" ? "success" : "warning"}>{subscription.status}</Badge> },
    { key: "period", header: "Current period ends", render: (subscription) => subscription.currentPeriodEndsAt ? new Date(subscription.currentPeriodEndsAt).toLocaleDateString() : "-" }
  ];

  return (
    <>
      <PageHeader title="Billing" description="Current subscription status. Stripe wiring can be added behind this module later." />
      {billingQuery.isLoading ? <LoadingState /> : null}
      {billingQuery.error ? <ErrorState error={billingQuery.error} /> : null}
      {billingQuery.data ? <DataTable data={billingQuery.data} columns={columns} emptyTitle="No subscriptions found" /> : null}
    </>
  );
}
