import type { Roles } from "./roles";

export interface UserInfo {
    id: number;
    name: string;
    email: string;
    rol?: Roles; // Hacemos rol opcional para manejar estados iniciales
}