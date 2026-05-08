"use server";

import { redirect } from "next/navigation";

import { findMockUser } from "./data/mock-users";
import { loginSchema } from "./schemas/login";
import { createSession, destroySession } from "./session";
import type { LoginState } from "./types";

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Revise os dados informados.",
    };
  }

  const user = findMockUser(parsed.data.email, parsed.data.role);

  if (!user || user.password !== parsed.data.password) {
    return {
      error: "Credenciais inválidas para o perfil selecionado.",
    };
  }

  await createSession({
    email: user.email,
    name: user.name,
    role: user.role,
  });

  redirect(user.role === "operator" ? "/dashboard" : "/workspace");
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
