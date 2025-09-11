import type { UserRole } from "@/types/user";

export function useUser(): { userRole: UserRole } {
  // Mock temporário; trocar quando integrar autenticação real
  return { userRole: "user" };
}
