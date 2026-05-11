import { Button } from "@/shared/ui/button";

export function Pagination({ page, canPrevious, canNext, onPrevious, onNext }: { page: number; canPrevious: boolean; canNext: boolean; onPrevious: () => void; onNext: () => void }) {
  return (
    <div className="flex items-center justify-end gap-3 py-4">
      <span className="text-sm text-slate-500">Page {page}</span>
      <Button variant="secondary" disabled={!canPrevious} onClick={onPrevious}>
        Previous
      </Button>
      <Button variant="secondary" disabled={!canNext} onClick={onNext}>
        Next
      </Button>
    </div>
  );
}
