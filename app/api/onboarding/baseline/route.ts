// app/api/onboarding/baseline/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // You can strongly type this later if needed
  const payload = {
    weightKg: body.weightKg ?? null,
    avgSleepHours: body.avgSleepHours ?? null,
    notes: body.notes ?? null,
    plan: body.plan ?? "UNSPECIFIED",
    receivedAt: new Date().toISOString(),
  };

  // TODO: Replace with real persistence (Supabase, Notion, etc.)
  console.log("Baseline onboarding payload:", payload);

  return NextResponse.json({ success: true });
}

