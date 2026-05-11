"use client";

import { useQuery } from "@tanstack/react-query";
import { billingApi } from "@/features/billing/api/billing.api";
import type { BillingSubscriptionListQuery } from "@/features/billing/types/billing.types";

export const billingQueryKeys = {
  subscriptions: (query?: BillingSubscriptionListQuery) => ["billing", "subscriptions", query ?? {}] as const
};

export function useBillingSubscriptionsQuery(query?: BillingSubscriptionListQuery) {
  return useQuery({ queryKey: billingQueryKeys.subscriptions(query), queryFn: () => billingApi.listSubscriptions(query) });
}
