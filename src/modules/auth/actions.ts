"use server";

import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";

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

  const user = await prisma.user.findUnique({
    where: {
      email: parsed.data.email.toLowerCase(),
    },
  });

  const requestedRoles = parsed.data.role === "operator" ? ["OPERATOR", "ADMIN"] : ["CLIENT"];

  if (
    !user ||
    !user.passwordHash ||
    !requestedRoles.includes(user.role) ||
    !verifyPassword(parsed.data.password, user.passwordHash)
  ) {
    return {
      error: "Credenciais invalidas para o perfil selecionado.",
    };
  }

  const role = user.role === "CLIENT" ? "client" : "operator";

  await createSession({
    id: user.id,
    email: user.email,
    name: user.name,
    role,
  });

  redirect(role === "operator" ? "/dashboard" : "/workspace");
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
