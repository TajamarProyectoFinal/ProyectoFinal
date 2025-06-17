import type { UserRole } from "./roles";

export interface UserRegisterDto {
    name: string;
    email: string;
    phone?: string;
    password: string;
    confirmPassword: string;
}

export interface UserLoginDto {
    email: string;
    password: string;
}
export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: UserRole;
}
