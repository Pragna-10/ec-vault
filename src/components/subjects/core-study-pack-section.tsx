import { CheckCircle2, FileSpreadsheet, BookOpen, Calculator, HelpCircle, Sparkles } from "lucide-react";
import { CoreSubjectStudyPack } from "@/lib/core-study-content";
import { ECEDiagram } from "@/components/subjects/ece-diagram";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CoreStudyPackSection({ pack }: { pack: CoreSubjectStudyPack }) {
  return (
    <section className="mb-14 space-y-8">
      <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50/80 via-white to-slate-50 p-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="blue">
            <Sparkles className="h-3 w-3 mr-1" />
            Original IIT-Level Study Content ({pack.version})
          </Badge>
          <Badge variant="emerald">SI Units · Verified Equations</Badge>
        </div>
        <h2 className="text-2xl font-bold text-[#0B1528]">
          Complete Study Pack: Checklist, Formula Sheet, Derivations &amp; Numericals
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Authored originally for undergraduate ECE preparation with step-by-step
          derivations, vector circuit/block diagrams, and exam-oriented Q&amp;A.
        </p>
      </div>

      {/* 1. Chapter Checklist & 2. One-Page Formula Sheet */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              Complete Chapter Checklist
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pack.chapterChecklist.map((item) => (
              <div key={item.chapter} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                <div className="text-sm font-semibold text-[#0B1528]">
                  {item.chapter}
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {item.keyTopics.map((t) => (
                    <Badge key={t} variant="slate">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-blue-200/80">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-blue-600" />
              One-Page Formula Sheet
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pack.formulaSheet.map((f) => (
              <div
                key={f.name}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-3"
              >
                <div className="text-xs font-semibold text-blue-700">{f.name}</div>
                <pre className="mt-1 whitespace-pre-wrap font-mono text-xs text-[#0B1528] leading-relaxed">
                  {f.equation}
                </pre>
                <div className="mt-1 text-[11px] text-slate-500">
                  {f.unitsAndNotes}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 3. Detailed Revision Notes & 4. Original Diagrams */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-600" />
              Detailed Revision Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pack.revisionNotes.map((sec) => (
              <div key={sec.heading}>
                <h4 className="text-sm font-semibold text-[#0B1528] mb-1.5">
                  {sec.heading}
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-600 list-disc pl-4">
                  {sec.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          {pack.diagrams.map((d) => (
            <ECEDiagram key={d.id} diagram={d} />
          ))}
        </div>
      </div>

      {/* 5. Important Derivations & 6. Solved Numerical Examples */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {pack.derivations.map((der) => (
          <Card key={der.title}>
            <CardHeader className="pb-3">
              <Badge variant="blue" className="w-fit mb-1">
                Important Derivation
              </Badge>
              <CardTitle className="text-base">{der.title}</CardTitle>
              <p className="text-xs text-slate-600">{der.statement}</p>
            </CardHeader>
            <CardContent className="space-y-2.5 text-xs text-slate-700">
              <ol className="space-y-1.5 list-decimal pl-4">
                {der.steps.map((s) => (
                  <li key={s} className="leading-relaxed">
                    {s}
                  </li>
                ))}
              </ol>
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-2.5 font-mono text-xs font-semibold text-blue-900">
                Result: {der.result}
              </div>
            </CardContent>
          </Card>
        ))}

        {pack.solvedNumericals.map((num) => (
          <Card key={num.title}>
            <CardHeader className="pb-3">
              <Badge variant="emerald" className="w-fit mb-1">
                <Calculator className="h-3 w-3 mr-1" />
                Solved Numerical (SI Units)
              </Badge>
              <CardTitle className="text-base">{num.title}</CardTitle>
              <p className="text-xs text-slate-700">{num.problem}</p>
            </CardHeader>
            <CardContent className="space-y-2.5 text-xs text-slate-700">
              <div className="font-mono text-[11px] text-slate-500">
                Given: {num.given}
              </div>
              <ol className="space-y-1.5 list-decimal pl-4">
                {num.steps.map((s) => (
                  <li key={s} className="leading-relaxed">
                    {s}
                  </li>
                ))}
              </ol>
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2.5 font-mono text-xs font-semibold text-emerald-900">
                Answer: {num.answer}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edition Previews for Network Theory Pilot */}
      {pack.subjectSlug === "network-theory" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <Badge variant="blue" className="w-fit mb-1">
                Professional Digital Edition
              </Badge>
              <CardTitle className="text-sm">
                Typeset One-Page Formula Sheet Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src="/previews/network-theory/digital-page-1.png"
                alt="Network Theory Professional Digital Edition Preview"
                className="w-full rounded-xl border border-slate-200 shadow-xs"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <Badge variant="amber" className="w-fit mb-1">
                Handwritten-Style Edition
              </Badge>
              <CardTitle className="text-sm">
                Notebook-Style Formula Sheet Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src="/previews/network-theory/handwritten-page-1.png"
                alt="Network Theory Handwritten-Style Edition Preview"
                className="w-full rounded-xl border border-slate-200 shadow-xs"
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* 7. Conceptual & Exam-Oriented Q&A */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-blue-600" />
            Conceptual &amp; Exam-Oriented Questions and Answers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pack.questionsAndAnswers.map((qa) => (
            <div
              key={qa.question}
              className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-1.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold text-[#0B1528]">
                  {qa.question}
                </span>
                <Badge variant={qa.type === "Conceptual" ? "blue" : "amber"}>
                  {qa.type}
                </Badge>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {qa.answer}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

