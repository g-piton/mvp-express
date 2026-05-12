import { NextResponse } from "next/server";

import { createSession } from "@/modules/auth/session";
import { signupSchema } from "@/modules/auth/schemas/signup";
import { createClientAccount } from "@/modules/leads/server";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = signupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Dados invalidos." },
      { status: 400 },
    );
  }

  try {
    const { user } = await createClientAccount(parsed.data);

    await createSession({
      id: user.id,
      email: user.email,
      name: user.name,
      role: "client",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Nao foi possivel criar a conta agora.",
      },
      { status: 400 },
    );
  }
}
