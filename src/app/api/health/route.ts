import { NextResponse } from "next/server";
import { createAdminSupabase, isServerSupabaseConfigured } from "@/lib/supabase/server";
import { isRazorpayConfigured } from "@/lib/razorpay";

export async function GET() {
  const supabaseConfigured = isServerSupabaseConfigured();
  let databaseConnected = false;

  if (supabaseConfigured) {
    const adminDb = createAdminSupabase();
    if (adminDb) {
      const { error } = await adminDb
        .from("semesters")
        .select("id", { count: "exact", head: true });
      databaseConnected = !error;
    }
  }

  return NextResponse.json({
    status: "ok",
    service: "EC Vault API",
    supabaseConfigured,
    databaseConnected,
    razorpayConfigured: isRazorpayConfigured(),
    timestamp: new Date().toISOString(),
  });
}
