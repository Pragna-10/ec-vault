import { NextResponse } from "next/server";
import { feedbackSchema } from "@/lib/validation";
import { createAdminSupabase, getAuthenticatedUserWithRole } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = feedbackSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { user } = await getAuthenticatedUserWithRole();
    const adminDb = createAdminSupabase();

    if (adminDb) {
      await adminDb.from("feedback_submissions").insert({
        user_id: user?.id ?? null,
        kind: parsed.data.kind,
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.subjectSlug
          ? `[Subject: ${parsed.data.subjectSlug}] ${parsed.data.message}`
          : parsed.data.message,
        status: "open",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your submission has been recorded for review by the EC Vault team.",
    });
  } catch (error) {
    console.error("Feedback submission error:", error);
    return NextResponse.json(
      { error: "Unable to submit feedback right now" },
      { status: 500 }
    );
  }
}

