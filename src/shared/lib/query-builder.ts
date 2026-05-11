export type QueryValue = string | number | boolean | null | undefined | Array<string | number>;

export function parseCsvParam(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value.join(",") : value;
  return raw ? raw.split(",").map((item) => item.trim()).filter(Boolean) : [];
}

export function buildQueryParams(values: Record<string, QueryValue>) {
  const params = new URLSearchParams();

  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) return;
    params.set(key, Array.isArray(value) ? value.join(",") : String(value));
  });

  return params;
}

export function mergeQueryParams(current: URLSearchParams, values: Record<string, QueryValue>) {
  const next = new URLSearchParams(current.toString());

  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
      next.delete(key);
      return;
    }
    next.set(key, Array.isArray(value) ? value.join(",") : String(value));
  });

  return next;
}
