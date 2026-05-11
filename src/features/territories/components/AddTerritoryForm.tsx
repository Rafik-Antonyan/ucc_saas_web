"use client";

import { useState } from "react";
import type { CreateTerritoryInput, Territory } from "@/features/territories/types/territories.types";
import { Button, Input, Select } from "@/shared/ui";

export function AddTerritoryForm({
  onSubmit,
  isSubmitting = false
}: {
  onSubmit: (input: CreateTerritoryInput) => Promise<Territory> | void;
  isSubmitting?: boolean;
}) {
  const [type, setType] = useState<CreateTerritoryInput["type"]>("STATE");
  const [value, setValue] = useState("");

  async function submit() {
    if (!value.trim()) return;
    await onSubmit({ type, value: value.trim() });
    setValue("");
  }

  return (
    <form
      className="grid gap-3 md:grid-cols-[180px_1fr_auto]"
      onSubmit={(event) => {
        event.preventDefault();
        void submit();
      }}
    >
      <Select value={type} onChange={(event) => setType(event.target.value as CreateTerritoryInput["type"])}>
        <option value="STATE">State</option>
        <option value="COUNTY">County</option>
        <option value="ZIP">ZIP</option>
      </Select>
      <Input value={value} placeholder={type === "STATE" ? "CA" : type === "ZIP" ? "90001" : "Los Angeles"} onChange={(event) => setValue(event.target.value)} />
      <Button type="submit" isLoading={isSubmitting}>Add territory</Button>
    </form>
  );
}
