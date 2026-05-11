import { api } from "@/shared/api/client";
import { endpoints } from "@/shared/api/endpoints";
import type { UpdateUserInput, User, UserListQuery } from "@/features/users/types/users.types";

export const usersApi = {
  list: (params?: UserListQuery) => api.get<User[]>(endpoints.users.base, { params }),
  getById: (id: string) => api.get<User>(endpoints.users.byId(id)),
  update: (id: string, input: UpdateUserInput) => api.patch<User, UpdateUserInput>(endpoints.users.byId(id), input),
  deactivate: (id: string) => api.delete<User>(endpoints.users.byId(id))
};
