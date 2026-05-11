"use client";

import axios, { type AxiosRequestConfig } from "axios";
import { z } from "zod";
import { env } from "@/shared/config/env";
import { clearAccessToken, getAccessToken } from "@/shared/lib/auth-storage";
import { normalizeError } from "@/shared/lib/error";
import type { ApiResponse } from "@/shared/types/api";

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const appError = normalizeError(error);
    if (appError.status === 401) {
      clearAccessToken();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("ucc-auth-logout"));
        if (!window.location.pathname.startsWith("/login")) {
          window.location.replace(`/login?next=${encodeURIComponent(window.location.pathname)}`);
        }
      }
    }
    return Promise.reject(error);
  }
);

async function unwrap<T>(request: Promise<{ data: ApiResponse<T> }>, schema?: z.ZodType<T>) {
  const response = await request;
  const data = response.data.data;
  return schema ? schema.parse(data) : data;
}

async function unwrapResponse<T>(request: Promise<{ data: ApiResponse<T> }>, schema?: z.ZodType<T>) {
  const response = await request;
  const data = schema ? schema.parse(response.data.data) : response.data.data;
  return { data, meta: response.data.meta };
}

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig, schema?: z.ZodType<T>) =>
    unwrap<T>(apiClient.get<ApiResponse<T>>(url, config), schema),
  getResponse: <T>(url: string, config?: AxiosRequestConfig, schema?: z.ZodType<T>) =>
    unwrapResponse<T>(apiClient.get<ApiResponse<T>>(url, config), schema),
  post: <T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig, schema?: z.ZodType<T>) =>
    unwrap<T>(apiClient.post<ApiResponse<T>>(url, body, config), schema),
  patch: <T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig, schema?: z.ZodType<T>) =>
    unwrap<T>(apiClient.patch<ApiResponse<T>>(url, body, config), schema),
  delete: <T>(url: string, config?: AxiosRequestConfig, schema?: z.ZodType<T>) =>
    unwrap<T>(apiClient.delete<ApiResponse<T>>(url, config), schema)
};
