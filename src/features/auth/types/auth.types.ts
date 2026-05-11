import type { AuthSession, CurrentUser } from "@/shared/types/auth";

export type LoginInput = {
  email: string;
  password: string;
};

export type { AuthSession, CurrentUser };
