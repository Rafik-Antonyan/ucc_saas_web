import type { LeadActivity } from "@/features/activities/types/activities.types";
import { formatDate } from "@/shared/lib/format-date";

const labels: Record<LeadActivity["type"], string> = {
  NOTE_ADDED: "Note added",
  FOLLOW_UP_CREATED: "Follow-up created",
  PROPOSAL_SENT: "Proposal sent",
  CUSTOMER_CLOSED: "Customer closed",
  EXPORT_PURCHASED: "Export purchased"
};

function actorName(activity: LeadActivity) {
  return [activity.actor?.firstName, activity.actor?.lastName].filter(Boolean).join(" ") || activity.actor?.email || "System";
}

function description(activity: LeadActivity) {
  const metadata = activity.metadata;
  if (metadata && typeof metadata.description === "string") return metadata.description;
  if (metadata && typeof metadata.note === "string") return metadata.note;
  return labels[activity.type];
}

export function ActivityItem({ activity }: { activity: LeadActivity }) {
  return (
    <li className="relative pl-5">
      <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
      <p className="text-sm font-medium text-slate-950">{labels[activity.type]}</p>
      <p className="text-sm text-slate-600">{description(activity)}</p>
      <p className="mt-1 text-xs text-slate-500">{actorName(activity)} · {formatDate(activity.createdAt)}</p>
    </li>
  );
}
