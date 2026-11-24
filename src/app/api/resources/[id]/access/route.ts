import { NextResponse } from "next/server";
import { CURRICULUM_SUBJECTS } from "@/lib/curriculum-data";
import { CORE_SUBJECT_STUDY_PACKS } from "@/lib/core-study-content";
import { createAdminSupabase, getAuthenticatedUserWithRole } from "@/lib/supabase/server";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  // Locate resource in catalog
  let matchedSubject = null;
  let matchedResource = null;
  for (const subject of CURRICULUM_SUBJECTS) {
    const found = subject.resources.find((r) => r.id === id);
    if (found) {
      matchedSubject = subject;
      matchedResource = found;
      break;
    }
  }

  if (!matchedResource || !matchedSubject) {
    return NextResponse.json({ error: "Resource not found" }, { status: 404 });
  }

  const { user, role, supabaseConfigured } = await getAuthenticatedUserWithRole();

  let hasAccess = matchedResource.isFree || role === "admin";
  let signedUrl: string | null = null;

  if (!hasAccess && supabaseConfigured && user) {
    const adminDb = createAdminSupabase();
    if (adminDb) {
      const { data: entitlements } = await adminDb
        .from("entitlements")
        .select("id, scope, subject_id, resource_id, semester_number, year_number")
        .eq("user_id", user.id)
        .eq("is_active", true);

      if (entitlements && entitlements.length > 0) {
        hasAccess = entitlements.some(
          (e) =>
            e.scope === "four_year" ||
            (e.scope === "year" && e.year_number === matchedSubject.yearNumber) ||
            (e.scope === "semester" && e.semester_number === matchedSubject.semesterNumber) ||
            e.resource_id === matchedResource.id
        );
      }

      if (hasAccess && matchedResource.storagePath) {
        // Short-lived 120-second signed URL for protected PDF access
        const { data: signed } = await adminDb.storage
          .from("ec-vault-pdfs")
          .createSignedUrl(matchedResource.storagePath, 120);
        signedUrl = signed?.signedUrl ?? null;
      }
    }
  }

  const corePack = CORE_SUBJECT_STUDY_PACKS[matchedSubject.slug];

  return NextResponse.json({
    resourceId: matchedResource.id,
    title: matchedResource.title,
    subjectTitle: matchedSubject.title,
    isFree: matchedResource.isFree,
    isSampleDemo: corePack ? false : matchedResource.isSampleDemo,
    allowDownload: hasAccess ? matchedResource.allowDownload : false,
    hasFullAccess: hasAccess,
    signedUrl,
    expiresInSeconds: signedUrl ? 120 : null,
    previewPages: matchedResource.previewPages,
    chapters: matchedSubject.chapters,
    originalFormulaSheet: corePack ? corePack.formulaSheet : null,
    notice: corePack
      ? "Original IIT-level EC Vault study content loaded."
      : matchedResource.isSampleDemo
      ? "Sample/Demo resource structure. Upload verified PDFs to Supabase Storage bucket 'ec-vault-pdfs' for live signed PDF streaming."
      : undefined,
  });
}

