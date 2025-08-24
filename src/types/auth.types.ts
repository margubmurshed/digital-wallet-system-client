
export interface ILoginInfo {
    phone: string;
    password: string;
}

export interface ILoginResponseData {
    accessToken: string
    refreshToken: string
    user: User
}

export interface IRegisterInfo {
    name: string
    email: string
    password: string
    phone?: string
    address?: string
}

export interface IUpdateUserInfo {
    _id: string,
    name?: string
    password?: string
    role?:"USER" | "AGENT" | "ADMIN" | "SUPER_ADMIN";
    status?:"ACTIVE" | "BLOCKED";
    commissionRate?: number;
}

export interface IRegisterResponseData {
    name: string,
    phone: string,
    email: string,
    role: "USER" | "AGENT" | "ADMIN" | "SUPER_ADMIN",
    status: "ACTIVE" | "BLOCKED",
    commissionRate: number,
    isApproved: boolean,
    _id: string,
    createdAt: string,
    updatedAt: string
}

export interface Auth {
    provider: string
    providerId: string
}

export interface User {
    _id: string
    name: string;
    phone: string;
    email?: string;
    password: string;
    role: "USER" | "AGENT" | "ADMIN" | "SUPER_ADMIN",
    status: "ACTIVE" | "BLOCKED",
    commissionRate: number;
    isApproved: boolean
}