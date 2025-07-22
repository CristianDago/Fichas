export type allowedRoles = "admin" | "catcher" | "editor" | "visit";

export interface User {
  id: string;
  email: string;
  password: string;
  role: allowedRoles;
}
