import { NextResponse } from "next/server";

import { quickIntakeSchema } from "@/modules/intake/schemas/quick-intake";
import { createQuickLead } from "@/modules/leads/server";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = quickIntakeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Dados invalidos." },
      { status: 400 },
    );
  }

  try {
    await createQuickLead(parsed.data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Nao foi possivel registrar sua empresa agora." },
      { status: 500 },
    );
  }
}
