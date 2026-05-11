import { api } from "@/shared/api/client";
import { endpoints } from "@/shared/api/endpoints";
import type { AuthSession } from "@/shared/types/auth";
import type { AcceptInviteInput, CreateInviteInput, Invite, InviteListQuery, PublicInvite } from "@/features/invites/types/invites.types";

export const invitesApi = {
  list: (params?: InviteListQuery) => api.get<Invite[]>(endpoints.invites.base, { params }),
  create: (input: CreateInviteInput) => api.post<Invite, CreateInviteInput>(endpoints.invites.base, input),
  getPublicInvite: (token: string) => api.get<PublicInvite>(endpoints.invites.publicByToken(token)),
  accept: (token: string, input: AcceptInviteInput) => api.post<AuthSession, AcceptInviteInput>(endpoints.invites.accept(token), input)
};
