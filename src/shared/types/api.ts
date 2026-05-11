export type ApiSuccess<T> = {
  success: true;
  data: T;
  meta?: ApiMeta;
};

export type ApiFailure = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export type ApiResponse<T> = ApiSuccess<T>;

export type ListResponse<T> = T[];

export type ApiMeta = {
  page?: number;
  pageSize?: number;
  total?: number;
  totalPages?: number;
  [key: string]: unknown;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: Required<Pick<ApiMeta, "page" | "pageSize" | "total" | "totalPages">> & Record<string, unknown>;
};
