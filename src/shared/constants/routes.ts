import { Building2, CalendarClock, CreditCard, Download, FileText, Gauge, Map, Megaphone, ShieldPlus, Users } from "lucide-react";
import { UserRole } from "@/shared/types/auth";

export type AppRouteKey =
  | "dashboard"
  | "admin"
  | "company"
  | "companies"
  | "users"
  | "invites"
  | "ucc"
  | "territories"
  | "companyTerritories"
  | "followups"
  | "billing"
  | "exports"
  | "alerts";

export type NavItem = {
  key: AppRouteKey;
  label: string;
  href: string;
  icon: typeof Gauge;
  roles: UserRole[];
};

export const NAV_ITEMS: NavItem[] = [
  { key: "dashboard", label: "Dashboard", href: "/dashboard", icon: Gauge, roles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.COMPANY_USER] },
  { key: "admin", label: "UCC Admin", href: "/admin/ucc", icon: FileText, roles: [UserRole.SUPER_ADMIN] },
  { key: "company", label: "Leads", href: "/company/leads", icon: FileText, roles: [UserRole.COMPANY_ADMIN, UserRole.COMPANY_USER] },
  { key: "companies", label: "Companies", href: "/companies", icon: Building2, roles: [UserRole.SUPER_ADMIN] },
  { key: "users", label: "Users", href: "/users", icon: Users, roles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN] },
  { key: "invites", label: "Invites", href: "/invites", icon: ShieldPlus, roles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN] },
  { key: "ucc", label: "Legacy UCC Records", href: "/ucc", icon: FileText, roles: [UserRole.SUPER_ADMIN] },
  { key: "territories", label: "Territories", href: "/territories", icon: Map, roles: [UserRole.SUPER_ADMIN] },
  { key: "companyTerritories", label: "Territories", href: "/company/territories", icon: Map, roles: [UserRole.COMPANY_ADMIN, UserRole.COMPANY_USER] },
  { key: "followups", label: "Followups", href: "/followups", icon: CalendarClock, roles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.COMPANY_USER] },
  { key: "billing", label: "Billing", href: "/billing", icon: CreditCard, roles: [UserRole.COMPANY_ADMIN] },
  { key: "exports", label: "Exports", href: "/exports", icon: Download, roles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN] },
  { key: "alerts", label: "Alerts", href: "/alerts", icon: Megaphone, roles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN] }
];

export const PUBLIC_ROUTES = ["/login", "/invite"] as const;
