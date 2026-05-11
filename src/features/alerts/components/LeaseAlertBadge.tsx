import { Badge } from "@/shared/ui/badge";
import { formatDate } from "@/shared/lib/format-date";

export function isLeaseNear(leaseEndDate?: string | null) {
  if (!leaseEndDate) return false;
  const end = new Date(leaseEndDate).getTime();
  if (Number.isNaN(end)) return false;
  const now = Date.now();
  const sixMonths = 183 * 24 * 60 * 60 * 1000;
  return end >= now && end - now <= sixMonths;
}

export function LeaseAlertBadge({ leaseEndDate, active, message }: { leaseEndDate?: string | null; active?: boolean; message?: string | null }) {
  if (!active && !isLeaseNear(leaseEndDate)) return null;
  return <Badge tone="warning">{message || `Lease expires within 6 months: ${formatDate(leaseEndDate)}`}</Badge>;
}
