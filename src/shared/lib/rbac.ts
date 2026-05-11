import { NAV_ITEMS } from "@/shared/constants/routes";
import { CurrentUser, UserRole } from "@/shared/types/auth";

export function hasRole(user: Pick<CurrentUser, "role"> | null | undefined, roles: UserRole[]) {
  return Boolean(user && roles.includes(user.role));
}

export function isSuperAdmin(user: Pick<CurrentUser, "role"> | null | undefined) {
  return user?.role === UserRole.SUPER_ADMIN;
}

export function isCompanyAdmin(user: Pick<CurrentUser, "role"> | null | undefined) {
  return user?.role === UserRole.COMPANY_ADMIN;
}

export function isCompanyUser(user: Pick<CurrentUser, "role"> | null | undefined) {
  return user?.role === UserRole.COMPANY_USER;
}

export function getRouteKey(pathname: string) {
  const segment = pathname.split("/").filter(Boolean)[0] || "dashboard";
  return segment;
}

export function canAccessRoute(user: Pick<CurrentUser, "role"> | null | undefined, pathname: string) {
  if (!user) return false;
  if (pathname === "/dashboard" || pathname === "/") return true;
  const key = getRouteKey(pathname);
  const navItem = NAV_ITEMS.find((item) => item.key === key);
  return navItem ? hasRole(user, navItem.roles) : true;
}
