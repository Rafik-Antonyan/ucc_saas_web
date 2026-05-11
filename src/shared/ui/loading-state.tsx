export function LoadingState({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-md border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
      {label}
    </div>
  );
}
