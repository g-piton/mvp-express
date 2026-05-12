import { NextResponse } from "next/server";

import { briefingIntakeSchema } from "@/modules/briefing/schemas/briefing-intake";
import { getSession } from "@/modules/auth/session";
import { createDetailedBriefing } from "@/modules/leads/server";

export async function POST(request: Request) {
  const session = await getSession();

  if (!session || session.role !== "client") {
    return NextResponse.json({ error: "Sessao invalida." }, { status: 401 });
  }

  const formData = await request.formData();
  const parsed = briefingIntakeSchema.safeParse({
    companyName: formData.get("companyName"),
    contactName: formData.get("contactName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    role: formData.get("role"),
    website: formData.get("website"),
    segment: formData.get("segment"),
    challenge: formData.get("challenge"),
    goal: formData.get("goal"),
    budget: formData.get("budget"),
    timeline: formData.get("timeline"),
    needsNda: formData.get("needsNda") === "true",
    consent: formData.get("consent") === "true",
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Dados invalidos." },
      { status: 400 },
    );
  }

  const fileEntry = formData.get("briefingFile");
  const file = fileEntry instanceof File ? fileEntry : null;

  try {
    await createDetailedBriefing(parsed.data, file, session.id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Nao foi possivel enviar o briefing agora." },
      { status: 500 },
    );
  }
}
