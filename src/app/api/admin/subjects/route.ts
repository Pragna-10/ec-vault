import { NextResponse } from "next/server";
import { adminSubjectSchema } from "@/lib/validation";
import { CURRICULUM_SUBJECTS } from "@/lib/curriculum-data";
import { createAdminSupabase, getAuthenticatedUserWithRole } from "@/lib/supabase/server";

export async function GET() {
  const { user, role, supabaseConfigured } = await getAuthenticatedUserWithRole();

  if (supabaseConfigured && (!user || role !== "admin")) {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  return NextResponse.json({
    subjects: CURRICULUM_SUBJECTS.map((s) => ({
      id: s.id,
      slug: s.slug,
      title: s.title,
      yearNumber: s.yearNumber,
      semesterNumber: s.semesterNumber,
      difficulty: s.difficulty,
      collectionPriceInr: s.collectionPriceInr,
      isElective: s.isElective,
      isLab: s.isLab,
      isPublished: s.isPublished,
    })),
  });
}

export async function POST(request: Request) {
  try {
    const { user, role, supabaseConfigured } = await getAuthenticatedUserWithRole();

    if (supabaseConfigured && (!user || role !== "admin")) {
      return NextResponse.json({ error: "Admin role required" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = adminSubjectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid subject payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const adminDb = createAdminSupabase();
    if (adminDb) {
      const { data: sem } = await adminDb
        .from("semesters")
        .select("id")
        .eq("semester_number", parsed.data.semesterNumber)
        .single();

      if (sem) {
        const { error } = await adminDb.from("subjects").insert({
          slug: parsed.data.slug,
          title: parsed.data.title,
          semester_id: sem.id,
          year_number: parsed.data.yearNumber,
          semester_number: parsed.data.semesterNumber,
          description: parsed.data.description,
          difficulty: parsed.data.difficulty,
          estimated_hours: parsed.data.estimatedHours,
          is_elective: parsed.data.isElective,
          is_lab: parsed.data.isLab,
          is_published: parsed.data.isPublished,
        });

        if (error) {
          return NextResponse.json({ error: error.message }, { status: 400 });
        }
      }
    }

    return NextResponse.json({
      success: true,
      subject: parsed.data,
      persistedToSupabase: Boolean(adminDb),
    });
  } catch (error) {
    console.error("Admin subject POST error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

