import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { SessionUser, UserRole } from "./types";

const SESSION_COOKIE = "mvp-express-session";

export async function createSession(user: SessionUser) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;

  if (!raw) {
    return null;
  }

  try {
    const session = JSON.parse(raw) as SessionUser;

    if (!session.email || !session.name || !session.role) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function requireRole(role: UserRole) {
  const session = await getSession();

  if (!session || session.role !== role) {
    redirect("/");
  }

  return session;
}

export async function redirectIfAuthenticated() {
  const session = await getSession();

  if (!session) {
    return;
  }

  redirect(session.role === "operator" ? "/dashboard" : "/workspace");
}
