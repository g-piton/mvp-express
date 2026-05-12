import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "mvp-express",
    timestamp: new Date().toISOString(),
  });
}
