import type { Territory } from "@/features/territories/types/territories.types";
import { Badge } from "@/shared/ui/badge";

export function TerritoryBadge({ territory }: { territory: Territory }) {
  return <Badge tone="info">{territory.label || `${territory.type}: ${territory.value}`}</Badge>;
}
