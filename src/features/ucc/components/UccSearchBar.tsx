"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

export function UccSearchBar({ value, onSearch }: { value?: string; onSearch: (value: string) => void }) {
  const [search, setSearch] = useState(value ?? "");

  return (
    <form
      className="flex gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(search.trim());
      }}
    >
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-3 py-2 px-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <Input className="pl-9" placeholder="Search debtor, secured party, file number, city, county, or ZIP" value={search} onChange={(event) => setSearch(event.target.value)} />
      </div>
      <Button type="submit" variant="secondary">Search</Button>
    </form>
  );
}
