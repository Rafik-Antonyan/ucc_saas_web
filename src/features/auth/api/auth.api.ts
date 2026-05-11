import { api } from "@/shared/api/client";
import { endpoints } from "@/shared/api/endpoints";
import type { AuthSession, CurrentUser, LoginInput } from "@/features/auth/types/auth.types";

export const authApi = {
  login: (input: LoginInput) => api.post<AuthSession, LoginInput>(endpoints.auth.login, input),
  me: () => api.get<CurrentUser>(endpoints.auth.me),
  acceptDisclaimer: () => api.post<CurrentUser>(endpoints.auth.acceptDisclaimer),
  logout: () => api.post<void>(endpoints.auth.logout)
};
