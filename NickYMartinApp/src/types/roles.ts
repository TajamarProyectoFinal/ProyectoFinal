export const USER_ROLES = {
    ADMIN: "Admin",
    CLIENTE: "Cliente",
    STAFF: "Staff"
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];