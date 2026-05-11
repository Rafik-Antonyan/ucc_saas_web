import type { ActivityType, LeadActivity } from "@/shared/types/domain";

export type ActivityListQuery = {
  uccRecordId?: string;
  type?: ActivityType;
};

export type { ActivityType, LeadActivity };
