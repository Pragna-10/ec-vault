"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { CURRICULUM_SUBJECTS } from "@/lib/curriculum-data";
import { SubjectCard } from "@/components/subjects/subject-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const QUICK_TOPICS = [
  "Signals",
  "VLSI",
  "MOSFET",
  "DSP",
  "Control",
  "Communication",
  "Embedded",
  "Verilog",
];

function SearchCatalogContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [year, setYear] = useState<string>(searchParams.get("year") ?? "all");
  const [semester, setSemester] = useState<string>(
    searchParams.get("semester") ?? "all"
  );
  const [difficulty, setDifficulty] = useState<string>("all");
  const [resourceType, setResourceType] = useState<string>("all");
  const [freeOnly, setFreeOnly] = useState<boolean>(
    searchParams.get("free") === "true"
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CURRICULUM_SUBJECTS.filter((s) => {
      if (year !== "all" && s.yearNumber !== Number(year)) return false;
      if (semester !== "all" && s.semesterNumber !== Number(semester)) return false;
      if (difficulty !== "all" && s.difficulty !== difficulty) return false;
      if (freeOnly && !s.resources.some((r) => r.isFree)) return false;
      if (
        resourceType !== "all" &&
        !s.resources.some((r) => r.resourceType === resourceType)
      ) {
        return false;
      }
      if (q) {
        const haystack = [
          s.title,
          s.description,
          ...s.chapters.map((c) => c.title),
          ...s.chapters.flatMap((c) => c.topics),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, year, semester, difficulty, resourceType, freeOnly]);

  const hasActiveFilters =
    Boolean(query.trim()) ||
    year !== "all" ||
    semester !== "all" ||
    difficulty !== "all" ||
    resourceType !== "all" ||
    freeOnly;

  const resetFilters = () => {
    setQuery("");
    setYear("all");
    setSemester("all");
    setDifficulty("all");
    setResourceType("all");
    setFreeOnly(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 animate-fade-in-up">
        <Badge variant="blue" className="mb-2.5">
          Subject &amp; Topic Search
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-[#0B1528] sm:text-4xl">
          Search ECE Subjects, Topics &amp; Resources
        </h1>
        <p className="mt-1.5 text-sm text-slate-600 max-w-2xl">
          Filter across academic year, semester, topic keywords, resource type,
          free availability, and difficulty level.
        </p>
      </div>

      {/* Filter Panel */}
      <div className="mb-8 rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by subject, chapter, or topic (e.g., Nyquist, MOSFET, FFT, Smith chart, Verilog)..."
            className="pl-10 pr-10 bg-white h-11 rounded-xl"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search query"
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Quick Topic Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mr-1">
            Popular Topics:
          </span>
          {QUICK_TOPICS.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => setQuery(query === topic ? "" : topic)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                query.toLowerCase() === topic.toLowerCase()
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            aria-label="Filter by academic year"
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">All Years (1–4)</option>
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="4">Year 4</option>
          </select>

          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            aria-label="Filter by semester"
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">All Semesters (1–8)</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={String(sem)}>
                Semester {sem}
              </option>
            ))}
          </select>

          <select
            value={resourceType}
            onChange={(e) => setResourceType(e.target.value)}
            aria-label="Filter by resource type"
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">All Resource Types</option>
            <option value="formula_sheet">Formula Cheat Sheet</option>
            <option value="concise_notes">Chapter-wise Concise Notes</option>
            <option value="numerical_handbook">Solved Numerical Handbook</option>
            <option value="exam_revision">Exam Revision Pack</option>
          </select>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            aria-label="Filter by difficulty"
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">All Difficulty Levels</option>
            <option value="Foundational">Foundational</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <label className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 cursor-pointer hover:border-blue-300 transition-colors">
            <input
              type="checkbox"
              checked={freeOnly}
              onChange={(e) => setFreeOnly(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600"
            />
            <span className="inline-flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              Free Only (₹0)
            </span>
          </label>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <SlidersHorizontal className="h-3.5 w-3.5 text-blue-600" />
            Showing <strong>{results.length}</strong> of{" "}
            {CURRICULUM_SUBJECTS.length} subjects
          </span>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <X className="h-3.5 w-3.5" />
              Reset All Filters
            </Button>
          )}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/40 p-12 text-center">
          <p className="text-base font-semibold text-[#0B1528]">
            No subjects matched your filters.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Try clearing some filters or request this subject for our upcoming
            curriculum additions.
          </p>
          <Button variant="outline" size="sm" className="mt-4" onClick={resetFilters}>
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-12 text-sm text-slate-500">
          Loading ECE search catalog...
        </div>
      }
    >
      <SearchCatalogContent />
    </Suspense>
  );
}
