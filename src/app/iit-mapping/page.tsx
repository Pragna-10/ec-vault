"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  ExternalLink,
  GraduationCap,
  Layers,
} from "lucide-react";
import {
  CURRICULUM_CATEGORY_LABELS,
  CurriculumCategoryKey,
  OFFICIAL_IIT_CURRICULA,
} from "@/lib/iit-curricula";
import { getSubjectBySlug } from "@/lib/curriculum-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function IITMappingPage() {
  const [selectedIIT, setSelectedIIT] = useState<string>("IITG");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const activeIIT =
    OFFICIAL_IIT_CURRICULA.find((i) => i.shortCode === selectedIIT) ??
    OFFICIAL_IIT_CURRICULA[0];

  const filteredCourses = activeIIT.courses.filter(
    (c) => selectedCategory === "all" || c.category === selectedCategory
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-8 animate-fade-in-up">
        <Badge variant="blue" className="mb-3">
          Official IIT Reference Mapping · Separate from Master Syllabus
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-[#0B1528] sm:text-4xl">
          8-IIT ECE &amp; EE Curriculum Mapping
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Explore undergraduate ECE/EE curriculum structures from IIT Bombay,
          IIT Delhi, IIT Madras, IIT Kanpur, IIT Kharagpur, IIT Guwahati, IIT
          Hyderabad, and IIT Roorkee — mapped to EC Vault&apos;s consolidated
          master syllabus.
        </p>
      </div>

      {/* Separation & Accuracy Notice */}
      <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          <strong>Strict Separation &amp; Verification Policy:</strong> Official
          IIT curriculum data is stored separately from EC Vault&apos;s
          consolidated master curriculum. Course codes that were not published
          on the retrieved official summary pages are explicitly marked{" "}
          <code>Not listed in retrieved summary</code> and are never fabricated.
        </div>
      </div>

      {/* IIT Selector Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {OFFICIAL_IIT_CURRICULA.map((iit) => (
          <Button
            key={iit.shortCode}
            variant={selectedIIT === iit.shortCode ? "primary" : "outline"}
            size="sm"
            onClick={() => setSelectedIIT(iit.shortCode)}
          >
            <GraduationCap className="h-3.5 w-3.5" />
            {iit.instituteName}
          </Button>
        ))}
      </div>

      {/* Active IIT Summary Card */}
      <Card className="mb-8 border-slate-200 bg-slate-50/60">
        <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-[#0B1528]">
                {activeIIT.instituteName}
              </h2>
              <Badge variant="slate">{activeIIT.shortCode}</Badge>
              <Badge variant="emerald">
                <Calendar className="h-3 w-3 mr-1" />
                Verified {activeIIT.verificationDate}
              </Badge>
            </div>
            <div className="text-sm font-medium text-slate-800">
              {activeIIT.degreeTitle}
            </div>
            <div className="text-xs text-slate-600">
              {activeIIT.departmentName} — {activeIIT.verificationNote}
            </div>
          </div>

          <Button variant="outline" size="sm" asChild className="shrink-0">
            <a
              href={activeIIT.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Official Source
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* 10-Category Filter */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 mr-1">
          <Layers className="h-3.5 w-3.5 text-blue-600" /> Category:
        </span>
        <Button
          variant={selectedCategory === "all" ? "default" : "ghost"}
          size="sm"
          onClick={() => setSelectedCategory("all")}
        >
          All 10 Categories
        </Button>
        {(Object.keys(CURRICULUM_CATEGORY_LABELS) as CurriculumCategoryKey[]).map(
          (key) => (
            <Button
              key={key}
              variant={selectedCategory === key ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(key)}
            >
              {CURRICULUM_CATEGORY_LABELS[key]}
            </Button>
          )
        )}
      </div>

      {/* Mapping Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {filteredCourses.map((course, idx) => {
          const masterSubject = getSubjectBySlug(course.masterSubjectSlug);
          return (
            <Card
              key={`${activeIIT.shortCode}-${course.category}-${idx}`}
              className="hover:border-blue-300 transition-colors"
            >
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <Badge variant="blue">
                    {CURRICULUM_CATEGORY_LABELS[course.category]}
                  </Badge>
                  <Badge variant="outline">{course.typicalSemester}</Badge>
                </div>
                <CardTitle className="text-base text-[#0B1528]">
                  {course.officialCourseName}
                </CardTitle>
                <div className="text-xs font-mono text-slate-500">
                  Official Code: {course.officialCourseCode}
                </div>
              </CardHeader>
              <CardContent className="space-y-3 border-t border-slate-100 pt-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Mapped EC Vault Master Subject &amp; Chapters
                  </div>
                  {masterSubject ? (
                    <Link
                      href={`/subjects/${masterSubject.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      {masterSubject.title}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <span className="text-sm text-slate-600">
                      {course.masterSubjectSlug}
                    </span>
                  )}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {course.mappedChapters.map((ch) => (
                      <Badge key={ch} variant="slate">
                        {ch}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

