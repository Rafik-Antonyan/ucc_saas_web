import { AxiosError } from "axios";
import type { ApiFailure } from "@/shared/types/api";

export type AppError = {
  code: string;
  message: string;
  status?: number;
  details?: unknown;
};

const friendlyByStatus: Record<number, string> = {
  400: "Please check the form and try again.",
  401: "Your session has expired. Please sign in again.",
  403: "You do not have access to this area.",
  404: "The requested record was not found.",
  500: "Something went wrong on the server."
};

export function normalizeError(error: unknown): AppError {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const payload = error.response?.data as ApiFailure | undefined;
    const apiError = payload?.success === false ? payload.error : undefined;

    return {
      code: apiError?.code || error.code || "API_ERROR",
      message: apiError?.message || (status ? friendlyByStatus[status] : undefined) || "Network request failed.",
      status,
      details: apiError?.details
    };
  }

  if (error instanceof Error) {
    return { code: "CLIENT_ERROR", message: error.message };
  }

  if (typeof error === "object" && error && "message" in error && typeof error.message === "string") {
    return { code: "CLIENT_ERROR", message: error.message };
  }

  return { code: "UNKNOWN_ERROR", message: "An unexpected error occurred." };
}

export function getErrorMessage(error: unknown) {
  return normalizeError(error).message;
}
