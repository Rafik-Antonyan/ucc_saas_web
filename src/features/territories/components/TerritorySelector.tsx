import type { Territory } from "@/features/territories/types/territories.types";
import { Select } from "@/shared/ui/select";

export function TerritorySelector({ territories, value, onChange }: { territories: Territory[]; value?: string; onChange: (value: string) => void }) {
  return (
    <Select value={value ?? ""} onChange={(event) => onChange(event.target.value)}>
      <option value="">All territories</option>
      {territories.map((territory) => (
        <option key={territory.id} value={territory.id}>{territory.label || `${territory.type}: ${territory.value}`}</option>
      ))}
    </Select>
  );
}
