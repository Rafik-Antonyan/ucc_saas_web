import type { Followup } from "@/shared/types/domain";

export type FollowupListQuery = {
  uccRecordId?: string;
  assignedToId?: string;
  completed?: "true" | "false";
};

export type FollowupFormInput = {
  uccRecordId?: string;
  followUpDate?: string;
  note?: string;
  status?: "OPEN" | "COMPLETED" | "CANCELLED";
  title?: string;
  dueAt?: string;
  assignedToId?: string;
};

export type { Followup };
