export type UserRole = "user" | "admin";
export type UserType = "discente" | "docente" | "tecnico" | "externo";

export interface IUser {
  id: number;
  fullName: string;
  email: string;
  type: UserType;
  role: UserRole;
  createdAt: Date;
  updatedAt?: Date;
}
