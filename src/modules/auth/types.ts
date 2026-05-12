export type UserRole = "client" | "operator";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
};

export type LoginState = {
  error?: string;
};
