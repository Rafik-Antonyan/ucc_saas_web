import type { UserRole } from "@/shared/types/auth";

export type Company = {
  id: string;
  name: string;
  slug?: string;
  email?: string | null;
  phone?: string | null;
  isActive: boolean;
  hasNationwideAccess: boolean;
  stripeCustomerId?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type User = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  role: UserRole;
  companyId?: string | null;
  company?: Pick<Company, "id" | "name"> | null;
  disclaimerAccepted?: boolean;
  isActive?: boolean;
  createdAt?: string;
};

export type InviteStatus = "PENDING" | "ACCEPTED" | "EXPIRED";

export type Invite = {
  id: string;
  email: string;
  role: UserRole;
  status: InviteStatus;
  companyId: string;
  company?: Pick<Company, "id" | "name">;
  expiresAt: string;
  acceptedAt?: string | null;
  createdAt?: string;
};

export type PublicInvite = {
  email: string;
  role: UserRole;
  company?: Pick<Company, "name">;
  expiresAt: string;
};

export type UccRecord = {
  id: string;
  companyId?: string;
  debtorName: string;
  debtorAddress?: string | null;
  debtorCity?: string | null;
  debtorState?: string | null;
  debtorZipCode?: string | null;
  debtorCounty?: string | null;
  debtorPhoneNumber?: string | null;
  securedPartyName?: string | null;
  collateralDescription?: string | null;
  leaseEndDate?: string | null;
  fileNumber?: string | null;
  proposalSent?: boolean;
  proposalSentAt?: string | null;
  soldClosed?: boolean;
  soldClosedAt?: string | null;
  duplicateWarning?: UccDuplicateWarning | null;
  leaseAlert?: LeaseAlert | null;
  securedParty?: string | null;
  filingNumber?: string | null;
  filingDate?: string | null;
  state?: string | null;
  county?: string | null;
  zip?: string | null;
  collateralText?: string | null;
  isCustomer?: boolean;
  createdAt?: string;
};

export type UccDuplicateWarning = {
  matchingDebtorName?: string | null;
  matchingAddress?: string | null;
  matchingSecuredParty?: string | null;
  matchingFileNumber?: string | null;
  message?: string | null;
};

export type LeaseAlert = {
  message?: string | null;
  leaseEndDate?: string | null;
  withinAlertWindow?: boolean;
};

export type Territory = {
  id: string;
  type: "STATE" | "COUNTY" | "ZIP";
  value: string;
  label?: string | null;
  companyId?: string;
};

export type LeadNote = {
  id: string;
  note?: string;
  body: string;
  author?: Pick<User, "id" | "email" | "firstName" | "lastName">;
  createdAt: string;
};

export type ActivityType = "NOTE_ADDED" | "FOLLOW_UP_CREATED" | "PROPOSAL_SENT" | "CUSTOMER_CLOSED" | "EXPORT_PURCHASED";

export type LeadActivity = {
  id: string;
  type: ActivityType;
  metadata?: Record<string, unknown> | null;
  actor?: Pick<User, "id" | "email" | "firstName" | "lastName"> | null;
  createdAt: string;
};

export type Followup = {
  id: string;
  note?: string | null;
  status?: "OPEN" | "COMPLETED" | "CANCELLED";
  followUpDate?: string;
  title: string;
  dueAt: string;
  completedAt?: string | null;
  uccRecordId?: string;
  uccRecord?: Pick<UccRecord, "id" | "debtorName">;
  assignedToId?: string | null;
  assignedTo?: Pick<User, "id" | "email" | "firstName" | "lastName"> | null;
};

export type BillingSubscription = {
  id: string;
  provider: string;
  plan: string;
  status: string;
  currentPeriodEndsAt?: string | null;
};

export type ExportRequest = {
  id: string;
  type: string;
  status: string;
  fileUrl?: string | null;
  createdAt: string;
  completedAt?: string | null;
};

export type AlertSummary = {
  overdueFollowUps: number;
};
