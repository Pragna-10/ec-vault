import Link from "next/link";
import { BookOpenCheck, CheckCircle2, Cpu, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "About EC Vault",
  description:
    "EC Vault is an affordable B.Tech ECE academic resource marketplace built on original content, consolidated IIT-level curricula, and transparent engineering standards.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-4">
        <Badge variant="blue">About EC Vault</Badge>
        <h1 className="text-3xl font-bold tracking-tight text-[#0B1528] sm:text-4xl">
          Four years of ECE. One place.
        </h1>
        <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
          EC Vault was architected to solve a recurring problem for Electronics
          and Communication Engineering (ECE) undergraduates across India:
          scattered lecture slides, unverified formula sheets, and expensive
          textbooks that make exam revision unnecessarily stressful.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <Cpu className="h-6 w-6 text-blue-600 mb-2" />
            <CardTitle className="text-base">Original Content Only</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            We do not copy or redistribute copyrighted textbooks or third-party
            PDFs. Materials are authored originally using NPTEL, MIT OCW, and
            publicly available IIT syllabus references.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <BookOpenCheck className="h-6 w-6 text-blue-600 mb-2" />
            <CardTitle className="text-base">10-Point Chapter Standard</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            Every chapter supports concept explanations, definitions, formulae,
            step-by-step derivations, circuit/block diagrams, solved numericals,
            common mistakes, and exam Q&amp;A.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <ShieldCheck className="h-6 w-6 text-blue-600 mb-2" />
            <CardTitle className="text-base">Transparent Verification</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            Our master curriculum is a consolidated IIT-level reference. All
            university-specific course codes remain marked{" "}
            <strong>Pending Verification</strong> until formally checked.
          </CardContent>
        </Card>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-[#0B1528] flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-blue-600" />
            Ready to explore the 4-year curriculum?
          </h2>
          <p className="text-sm text-slate-600">
            Browse all 8 semesters or request a missing elective subject.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="primary" asChild>
            <Link href="/curriculum">Explore Curriculum</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

