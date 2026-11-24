import Link from "next/link";
import { Clock, BookOpen, ArrowRight, FlaskConical, Sparkles, Layers } from "lucide-react";
import { Subject } from "@/types/database";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatINR } from "@/lib/utils";

export function SubjectCard({ subject }: { subject: Subject }) {
  const hasFreeSheet = subject.resources.some((r) => r.isFree);

  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden border-slate-200/90 bg-white hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg hover:shadow-slate-200/60 transition-all duration-200">
      <div className="h-1 w-full bg-gradient-to-r from-[#0B1528] via-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div>
        <CardHeader className="pb-3 pt-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant="blue">
                Y{subject.yearNumber} · Sem {subject.semesterNumber}
              </Badge>
              <Badge variant="slate">{subject.difficulty}</Badge>
            </div>
            {subject.isLab ? (
              <Badge variant="amber">
                <FlaskConical className="h-3 w-3 mr-1" />
                Lab
              </Badge>
            ) : subject.isElective ? (
              <Badge variant="outline">Elective</Badge>
            ) : null}
          </div>
          <CardTitle className="text-base font-semibold text-[#0B1528] leading-snug">
            <Link
              href={`/subjects/${subject.slug}`}
              className="hover:text-blue-600 transition-colors"
            >
              {subject.title}
            </Link>
          </CardTitle>
        </CardHeader>

        <CardContent className="pb-4 space-y-3.5">
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {subject.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-slate-400" />
              {subject.chapters.length} Chapters
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-slate-400" />
              4 Study Packs
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              {subject.estimatedHours}h
            </span>
          </div>
        </CardContent>
      </div>

      <CardFooter className="pt-3.5 pb-4 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#0B1528]">
            {formatINR(subject.collectionPriceInr)}
          </span>
          {hasFreeSheet && (
            <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              <Sparkles className="h-2.5 w-2.5 mr-1" />
              Free Preview
            </span>
          )}
        </div>
        <Link
          href={`/subjects/${subject.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:text-blue-700"
        >
          Explore
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
