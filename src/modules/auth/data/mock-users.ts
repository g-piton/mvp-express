import type { SessionUser, UserRole } from "../types";

type MockUser = SessionUser & {
  password: string;
};

export const mockUsers: MockUser[] = [
  {
    email: "cliente@demo.com",
    name: "Amanda Oliveira",
    role: "client",
    password: "demo123",
  },
  {
    email: "operador@demo.com",
    name: "Rafael Sales",
    role: "operator",
    password: "demo123",
  },
];

export function findMockUser(email: string, role: UserRole) {
  return mockUsers.find(
    (user) =>
      user.email.toLowerCase() === email.trim().toLowerCase() && user.role === role,
  );
}
