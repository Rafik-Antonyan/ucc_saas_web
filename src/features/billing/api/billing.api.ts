import { api } from "@/shared/api/client";
import { endpoints } from "@/shared/api/endpoints";
import type { BillingSubscription, BillingSubscriptionListQuery } from "@/features/billing/types/billing.types";

export const billingApi = {
  listSubscriptions: (params?: BillingSubscriptionListQuery) => api.get<BillingSubscription[]>(endpoints.billing.subscriptions, { params })
};
