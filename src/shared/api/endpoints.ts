export const endpoints = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    me: "/users/me",
    acceptDisclaimer: "/users/me/disclaimer"
  },
  invites: {
    base: "/invites",
    publicByToken: (token: string) => `/invites/public/${token}`,
    accept: (token: string) => `/invites/public/${token}/accept`
  },
  companies: {
    base: "/companies",
    byId: (id: string) => `/companies/${id}`
  },
  users: {
    base: "/users",
    byId: (id: string) => `/users/${id}`
  },
  ucc: {
    base: "/ucc",
    bulkImportPreview: "/ucc/bulk-import/preview",
    bulkImport: "/ucc/bulk-import",
    byId: (id: string) => `/ucc/${id}`,
    proposalSent: (id: string) => `/ucc/${id}/proposal-sent`,
    customerClosed: (id: string) => `/ucc/${id}/customer-closed`
  },
  territories: {
    base: "/territories",
    byId: (id: string) => `/territories/${id}`,
    company: "/company/territories",
    adminCompany: (companyId: string) => `/admin/companies/${companyId}/territories`,
    adminCompanyTerritory: (companyId: string, territoryId: string) => `/admin/companies/${companyId}/territories/${territoryId}`,
    adminCompanyNationwideAccess: (companyId: string) => `/admin/companies/${companyId}/nationwide-access`
  },
  notes: {
    base: "/notes",
    byId: (id: string) => `/notes/${id}`
  },
  activities: {
    base: "/activities"
  },
  followups: {
    base: "/followups",
    byId: (id: string) => `/followups/${id}`
  },
  billing: {
    subscriptions: "/billing/subscriptions"
  },
  exports: {
    base: "/exports"
  },
  alerts: {
    summary: "/alerts/summary",
    leaseExpirations: "/alerts/lease-expirations"
  },
  health: {
    base: "/health"
  }
} as const;
