import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  FileText,
  Flag,
  GraduationCap,
  Lock,
  Sparkles,
} from "lucide-react";
import { CURRICULUM_SUBJECTS, getSubjectBySlug } from "@/lib/curriculum-data";
import { CORE_SUBJECT_STUDY_PACKS } from "@/lib/core-study-content";
import { CoreStudyPackSection } from "@/components/subjects/core-study-pack-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatINR } from "@/lib/utils";

export async function generateStaticParams() {
  return CURRICULUM_SUBJECTS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const subject = getSubjectBySlug(slug);
  if (!subject) return { title: "Subject Not Found" };
  return {
    title: `${subject.title} — Notes, Formulas & Numericals`,
    description: subject.description,
  };
}

const RESOURCE_TYPE_LABELS: Record<string, string> = {
  formula_sheet: "A. Formula Cheat Sheet",
  concise_notes: "B. Chapter-wise Concise Notes",
  numerical_handbook: "C. Solved Numerical Handbook",
  exam_revision: "D. Exam Revision Pack",
};

export default async function SubjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const subject = getSubjectBySlug(slug);
  if (!subject) notFound();

  const relatedSubjects = subject.relatedSubjectSlugs
    .map((rSlug) => getSubjectBySlug(rSlug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const corePack = CORE_SUBJECT_STUDY_PACKS[subject.slug];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href={`/curriculum?year=${subject.yearNumber}`}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-[#0B1528] mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Year {subject.yearNumber} Curriculum
      </Link>

      {/* Header + Purchase Summary */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-12">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="blue">
              Year {subject.yearNumber} · Semester {subject.semesterNumber}
            </Badge>
            <Badge variant="slate">{subject.difficulty}</Badge>
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              Est. {subject.estimatedHours} hrs study
            </Badge>
            {subject.isElective && <Badge variant="outline">Elective</Badge>}
            {subject.isLab && <Badge variant="amber">Laboratory Course</Badge>}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#0B1528] sm:text-4xl">
            {subject.title}
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            {subject.description}
          </p>

          {/* Learning Outcomes */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
            <h2 className="text-sm font-semibold text-[#0B1528] mb-3 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-blue-600" />
              Learning Outcomes
            </h2>
            <ul className="space-y-2">
              {subject.learningOutcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex items-start gap-2 text-sm text-slate-700"
                >
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sticky Subject Collection Card */}
        <div>
          <Card className="border-slate-200 shadow-md">
            <CardHeader>
              <Badge variant="amber" className="w-fit mb-2">
                Sample / Demo Collection Structure
              </Badge>
              <CardTitle className="text-lg">
                Complete Subject Collection
              </CardTitle>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#0B1528]">
                  ₹{subject.collectionPriceInr}
                </span>
                <span className="text-xs text-slate-500">
                  One-time · All 4 study packs
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                  One-Page Formula Cheat Sheet
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                  Chapter-wise Concise Notes (Handwritten + Typeset)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                  Solved Numerical Handbook
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                  Exam Revision Pack (Derivations &amp; Q&amp;A)
                </li>
              </ul>

              <Button variant="primary" size="lg" className="w-full" asChild>
                <Link
                  href={`/checkout?sku=ECV-SUB-CORE&subject=${subject.slug}`}
                >
                  Unlock Subject for ₹{subject.collectionPriceInr}
                </Link>
              </Button>

              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/pricing">
                  Or get Semester Bundle for ₹99 →
                </Link>
              </Button>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <Link
                  href={`/contact?kind=error_report&subject=${subject.slug}`}
                  className="inline-flex items-center gap-1 text-slate-500 hover:text-red-600"
                >
                  <Flag className="h-3.5 w-3.5" />
                  Report an Error
                </Link>
                <Link
                  href="/dashboard"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Bookmark / Wishlist
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Original Study Pack (for 5 Core Subjects) */}
      {corePack && <CoreStudyPackSection pack={corePack} />}

      {/* 4 Study Material Resources + Free Previews */}
      <section className="mb-14">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#0B1528]">
            Study Materials &amp; Free Previews
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            All initial resources are clearly marked as Sample/Demo until verified original PDFs are uploaded.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {subject.resources.map((res) => (
            <Card key={res.id} className="flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <Badge variant={res.isFree ? "emerald" : "blue"}>
                    {RESOURCE_TYPE_LABELS[res.resourceType]}
                  </Badge>
                  <div className="flex items-center gap-1.5">
                    <Badge variant="outline">
                      {res.documentStyle === "handwritten"
                        ? "Handwritten-Style"
                        : "Typeset PDF"}
                    </Badge>
                    <Badge variant="amber">Sample/Demo</Badge>
                  </div>
                </div>
                <CardTitle className="text-base">{res.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600">{res.description}</p>

                {/* Free Preview Box */}
                {res.previewPages[0] && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs space-y-1.5">
                    <div className="font-semibold text-[#0B1528] flex items-center justify-between">
                      <span>Free Preview · Page 1: {res.previewPages[0].title}</span>
                      <span className="font-mono text-[11px] text-slate-400">
                        {res.pageCount} pages · {res.version}
                      </span>
                    </div>
                    <p className="text-slate-600">{res.previewPages[0].excerpt}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="text-sm font-bold text-[#0B1528]">
                    {res.isFree ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700">
                        <Sparkles className="h-4 w-4" /> Free (₹0)
                      </span>
                    ) : (
                      formatINR(res.priceInr)
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/reader/${res.id}`}>
                        <Eye className="h-3.5 w-3.5" />
                        {res.isFree ? "Open Free Reader" : "Preview in Reader"}
                      </Link>
                    </Button>
                    {!res.isFree && (
                      <Button variant="primary" size="sm" asChild>
                        <Link
                          href={`/checkout?sku=ECV-SUB-CORE&subject=${subject.slug}`}
                        >
                          <Lock className="h-3.5 w-3.5" />
                          Unlock
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Chapters & Standardized Educational Quality Template */}
      <section className="mb-14">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#0B1528]">
            Chapters, Topics &amp; Educational Template
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Each chapter follows EC Vault&apos;s 10-part engineering study standard: concepts, definitions, formulae, derivations, diagrams, numericals, mistakes, exam Q&amp;A, and further reading.
          </p>
        </div>

        <div className="space-y-4">
          {subject.chapters.map((ch) => (
            <Card key={ch.id}>
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    Chapter {ch.chapterNumber}: {ch.title}
                  </CardTitle>
                  <div className="flex flex-wrap gap-1.5">
                    {ch.topics.map((topic) => (
                      <Badge key={topic} variant="slate">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-slate-600">{ch.summary}</p>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 text-xs text-slate-700 border-t border-slate-100 pt-4">
                <div>
                  <div className="font-semibold text-[#0B1528] mb-1">
                    Concept Explanation
                  </div>
                  <p className="leading-relaxed">
                    {ch.contentTemplate.conceptExplanation}
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-[#0B1528] mb-1">
                    Key Mathematical Formula
                  </div>
                  {ch.contentTemplate.mathematicalFormulae[0] && (
                    <div className="rounded-lg bg-slate-50 border border-slate-200 p-2.5 font-mono text-[11px]">
                      <div className="font-semibold text-blue-700">
                        {ch.contentTemplate.mathematicalFormulae[0].name}
                      </div>
                      <div className="mt-0.5 text-[#0B1528]">
                        {ch.contentTemplate.mathematicalFormulae[0].formula}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* University Curriculum Mappings (Pending Verification) */}
      <section className="mb-14">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-xl font-bold text-[#0B1528]">
              University Curriculum Mapping
            </h2>
            <p className="text-xs text-slate-600">
              Extensible mapping for IITs, NITs, and engineering universities. Official course codes are never fabricated.
            </p>
          </div>
          <Badge variant="amber">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Pending Verification
          </Badge>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">University / Reference</th>
                <th className="px-4 py-3">Programme</th>
                <th className="px-4 py-3">Sem</th>
                <th className="px-4 py-3">Course Code</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {subject.universityMappings.map((m) => (
                <tr key={m.id}>
                  <td className="px-4 py-3 font-medium text-[#0B1528]">
                    {m.universityName}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{m.programme}</td>
                  <td className="px-4 py-3 text-slate-600">Sem {m.semesterNumber}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">
                    {m.courseCode}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="amber">Pending Verification</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reference Resources & Related Subjects */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              Trusted Reference Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {subject.referenceResources.map((ref) => (
              <a
                key={ref.title}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-slate-200 p-3 text-sm hover:border-blue-300 transition-colors"
              >
                <div>
                  <div className="font-medium text-[#0B1528]">{ref.title}</div>
                  <div className="text-xs text-slate-500">{ref.provider}</div>
                </div>
                <ExternalLink className="h-4 w-4 text-slate-400" />
              </a>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Related ECE Subjects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {relatedSubjects.map((rel) => (
              <Link
                key={rel.id}
                href={`/subjects/${rel.slug}`}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-3 text-sm hover:border-blue-300 transition-colors"
              >
                <div>
                  <div className="font-medium text-[#0B1528]">{rel.title}</div>
                  <div className="text-xs text-slate-500">
                    Year {rel.yearNumber} · Semester {rel.semesterNumber}
                  </div>
                </div>
                <span className="text-xs font-semibold text-blue-600">
                  View →
                </span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

