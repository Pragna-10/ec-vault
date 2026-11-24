import { Suspense } from "react";
import Link from "next/link";
import { AlertCircle, BookOpen, Filter } from "lucide-react";
import { CURRICULUM_SUBJECTS, SEMESTERS_META } from "@/lib/curriculum-data";
import { SubjectCard } from "@/components/subjects/subject-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "4-Year B.Tech ECE Curriculum Library",
  description:
    "Consolidated IIT-level master curriculum for Electronics and Communication Engineering across Years 1 to 4, including electives and labs.",
};

async function CurriculumContent({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; semester?: string; type?: string }>;
}) {
  const params = await searchParams;
  const selectedYear = params.year ? Number(params.year) : null;
  const selectedSem = params.semester ? Number(params.semester) : null;
  const selectedType = params.type ?? "all";

  const filtered = CURRICULUM_SUBJECTS.filter((s) => {
    if (selectedYear && s.yearNumber !== selectedYear) return false;
    if (selectedSem && s.semesterNumber !== selectedSem) return false;
    if (selectedType === "elective" && !s.isElective) return false;
    if (selectedType === "lab" && !s.isLab) return false;
    if (selectedType === "core" && (s.isElective || s.isLab)) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-8">
        <Badge variant="blue" className="mb-3">
          Consolidated IIT-Level Master Curriculum
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-[#0B1528] sm:text-4xl">
          4-Year B.Tech ECE Curriculum Library
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Explore {CURRICULUM_SUBJECTS.length} core courses, interdisciplinary
          electives, and laboratory modules organized across 4 years and 8
          semesters.
        </p>
      </div>

      {/* Curriculum Accuracy Notice */}
      <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          <strong>Curriculum Accuracy Notice:</strong> This is a consolidated
          IIT-level master curriculum, not a claim that every subject is
          compulsory at every IIT. University-specific course codes and credit
          mappings for IITs, NITs, and State Universities are tracked in our
          extensible mapping system and marked as{" "}
          <span className="font-semibold underline">Pending Verification</span>{" "}
          until formally verified.
        </div>
      </div>

      {/* Year & Type Filters */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 mr-2">
            <Filter className="h-3.5 w-3.5" /> Year:
          </span>
          <Button
            variant={!selectedYear && !selectedSem ? "primary" : "outline"}
            size="sm"
            asChild
          >
            <Link href="/curriculum">All Years</Link>
          </Button>
          {[1, 2, 3, 4].map((yr) => (
            <Button
              key={yr}
              variant={selectedYear === yr ? "primary" : "outline"}
              size="sm"
              asChild
            >
              <Link href={`/curriculum?year=${yr}`}>Year {yr}</Link>
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { key: "all", label: "All Types" },
            { key: "core", label: "Core" },
            { key: "elective", label: "Electives" },
            { key: "lab", label: "Labs" },
          ].map((t) => {
            const qs = new URLSearchParams();
            if (selectedYear) qs.set("year", String(selectedYear));
            if (selectedSem) qs.set("semester", String(selectedSem));
            if (t.key !== "all") qs.set("type", t.key);
            return (
              <Button
                key={t.key}
                variant={selectedType === t.key ? "default" : "ghost"}
                size="sm"
                asChild
              >
                <Link href={`/curriculum?${qs.toString()}`}>{t.label}</Link>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Semester Quick Chips */}
      <div className="mb-8 flex flex-wrap gap-2">
        {SEMESTERS_META.map((sem) => (
          <Link
            key={sem.semester}
            href={`/curriculum?semester=${sem.semester}`}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              selectedSem === sem.semester
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            }`}
          >
            Sem {sem.semester} (Y{sem.year})
          </Link>
        ))}
      </div>

      {/* Results */}
      <div className="mb-4 flex items-center justify-between text-sm text-slate-600">
        <span className="inline-flex items-center gap-1.5">
          <BookOpen className="h-4 w-4 text-blue-600" />
          Showing <strong>{filtered.length}</strong> subjects
        </span>
        <Link href="/contact?kind=subject_request" className="text-blue-600 hover:underline text-xs font-medium">
          Missing a subject? Request a Subject →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  );
}

export default function CurriculumPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; semester?: string; type?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-12 text-sm text-slate-500">
          Loading ECE curriculum...
        </div>
      }
    >
      <CurriculumContent searchParams={searchParams} />
    </Suspense>
  );
}

