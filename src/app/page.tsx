import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Cpu,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { HeroSearch } from "@/components/home/hero-search";
import { SubjectCard } from "@/components/subjects/subject-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CURRICULUM_SUBJECTS,
  SEMESTERS_META,
  getFreeResources,
  getPopularSubjects,
} from "@/lib/curriculum-data";
import { PRICING_BUNDLES } from "@/lib/pricing";

const YEARS = [
  {
    year: 1,
    title: "Year 1 · Engineering Foundations",
    description:
      "Engineering Mathematics I & II, Physics, Chemistry, C Programming, Basic Electrical, Basic Electronics, Mechanics & Graphics.",
    count: CURRICULUM_SUBJECTS.filter((s) => s.yearNumber === 1).length,
  },
  {
    year: 2,
    title: "Year 2 · Core Circuits & Signals",
    description:
      "Network Theory, Electronic Devices, Analog & Digital Circuits, Signals & Systems, EMT, Probability, Control & Microprocessors.",
    count: CURRICULUM_SUBJECTS.filter((s) => s.yearNumber === 2).length,
  },
  {
    year: 3,
    title: "Year 3 · Comm, DSP & VLSI",
    description:
      "Analog & Digital Communication, DSP, Information Theory, Computer Networks, Antenna, RF, Microwave, VLSI & Embedded Systems.",
    count: CURRICULUM_SUBJECTS.filter((s) => s.yearNumber === 3).length,
  },
  {
    year: 4,
    title: "Year 4 · IC Design, 5G & Edge AI",
    description:
      "Advanced VLSI, Analog/Digital IC Design, MEMS, Image/Speech/Adaptive SP, Satellite, Radar, 5G/6G, IoT, Robotics & FPGA.",
    count: CURRICULUM_SUBJECTS.filter((s) => s.yearNumber === 4).length,
  },
];

const FAQS = [
  {
    q: "Is EC Vault aligned with IIT, NIT, and university syllabi?",
    a: "EC Vault uses a consolidated IIT-level master curriculum as its structural backbone, with extensible university mappings for IITs, NITs, and State Universities. University-specific course codes are explicitly marked as pending verification until formally verified.",
  },
  {
    q: "What four types of study material do I get per subject?",
    a: "Every subject supports: (A) One-page Formula Cheat Sheet, (B) Chapter-wise Concise Notes, (C) Solved Numerical Handbook, and (D) Exam Revision Pack with derivations & Q&A — available in both Handwritten-style and Typeset digital editions.",
  },
  {
    q: "Are the PDFs currently sample/demo resources?",
    a: "Yes. All initial study resources in this launch build are clearly labelled as Sample/Demo structures so you can evaluate the curriculum, chapter templates, and preview pages before original verified PDFs are uploaded.",
  },
  {
    q: "How do Razorpay payments and PDF protection work?",
    a: "Orders and payment signatures are verified server-side via Razorpay (supporting UPI, cards, and netbanking). When Razorpay keys are not configured, checkout runs in a clearly labelled Sandbox/Demo mode. Purchased PDFs are served via short-lived signed URLs.",
  },
];

const DEMO_TESTIMONIALS = [
  {
    name: "Demo Student Profile A",
    college: "Sample B.Tech ECE · Semester 4",
    quote:
      "Sample testimonial placeholder: Having Signals & Systems formula sheets alongside solved numericals in one place saved hours before mid-sems.",
  },
  {
    name: "Demo Student Profile B",
    college: "Sample B.Tech ECE · Semester 6",
    quote:
      "Sample testimonial placeholder: The ₹99 semester bundle covers VLSI, DSP, and Digital Communication without hunting across random drives.",
  },
  {
    name: "Demo Student Profile C",
    college: "Sample B.Tech ECE · Semester 7",
    quote:
      "Sample testimonial placeholder: Clean handwritten-style derivations paired with typeset formula sheets make last-week revision structured.",
  },
];

export default function HomePage() {
  const popularSubjects = getPopularSubjects().slice(0, 6);
  const freeResources = getFreeResources().slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-white bg-ece-grid">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700 mb-6">
            <Cpu className="h-3.5 w-3.5" />
            <span>Consolidated IIT-Level B.Tech ECE Master Curriculum</span>
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-[#0B1528] sm:text-6xl">
            Four years of ECE. One place.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600 sm:text-xl leading-relaxed">
            Understand concepts. Master formulas. Prepare smarter. Affordable,
            structured study packs across all 8 semesters of Electronics &amp;
            Communication Engineering.
          </p>

          <HeroSearch />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="default" size="lg" asChild>
              <Link href="/curriculum">
                Explore 4-Year Curriculum
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/pricing">View Bundles (From ₹19)</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              {CURRICULUM_SUBJECTS.length} ECE Subjects &amp; Labs
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              4 Resource Formats per Subject
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              Handwritten-Style &amp; Typeset Editions
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              Free Formula Previews (₹0)
            </span>
          </div>
        </div>
      </section>

      {/* 2. BROWSE BY ACADEMIC YEAR */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <Badge variant="blue" className="mb-2">Academic Structure</Badge>
            <h2 className="text-2xl font-bold tracking-tight text-[#0B1528] sm:text-3xl">
              Browse by Academic Year
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Navigate the complete 4-year B.Tech ECE progression from foundational math to 5G/6G and IC design.
            </p>
          </div>
          <Link
            href="/curriculum"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
          >
            Full Curriculum Library <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {YEARS.map((item) => (
            <Link
              key={item.year}
              href={`/curriculum?year=${item.year}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-[#0B1528] group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  Y{item.year}
                </span>
                <Badge variant="slate">{item.count} Subjects</Badge>
              </div>
              <h3 className="text-base font-semibold text-[#0B1528] group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. BROWSE BY SEMESTER */}
      <section className="border-y border-slate-200/80 bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold tracking-tight text-[#0B1528] sm:text-2xl">
              Browse by Semester (Semesters 1–8)
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Jump directly to your current semester subjects, lab manuals, and ₹99 semester bundles.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {SEMESTERS_META.map((sem) => (
              <Link
                key={sem.semester}
                href={`/curriculum?semester=${sem.semester}`}
                className="rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-500 hover:shadow-sm transition-all"
              >
                <div className="text-xs font-semibold text-blue-600">
                  Year {sem.year}
                </div>
                <div className="mt-0.5 text-sm font-bold text-[#0B1528]">
                  {sem.title}
                </div>
                <p className="mt-1.5 text-[11px] text-slate-500 line-clamp-2">
                  {sem.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. POPULAR SUBJECTS */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <Badge variant="slate" className="mb-2">Core &amp; High-Demand</Badge>
            <h2 className="text-2xl font-bold tracking-tight text-[#0B1528] sm:text-3xl">
              Popular ECE Subjects
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Foundational and GATE-critical subjects with complete 4-part study templates.
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/search">Browse All {CURRICULUM_SUBJECTS.length} Subjects</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {popularSubjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </section>

      {/* 5. FOUR STUDY MATERIAL TYPES (FEATURED COLLECTIONS) */}
      <section className="border-y border-slate-200/80 bg-[#0B1528] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <Badge className="bg-blue-600 text-white mb-3">
              Standardized Academic Format
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Four types of study material for every subject
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Every subject collection is structured into four focused study formats,
              supporting both tablet handwritten-style notes and professionally typeset PDFs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                code: "A",
                icon: FileSpreadsheet,
                title: "One-Page Formula Cheat Sheet",
                desc: "High-density equations, transform pairs, units, and sign conventions for rapid recall.",
              },
              {
                code: "B",
                icon: FileText,
                title: "Chapter-wise Concise Notes",
                desc: "Clear concept explanations, block/circuit diagrams, and annotated derivations.",
              },
              {
                code: "C",
                icon: Layers,
                title: "Solved Numerical Handbook",
                desc: "Step-by-step worked problems graded from university exams to GATE level.",
              },
              {
                code: "D",
                icon: BookOpenCheck,
                title: "Exam Revision Pack",
                desc: "High-yield derivations, short-answer Q&A, common mistakes, and viva prompts.",
              },
            ].map((item) => (
              <div
                key={item.code}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <item.icon className="h-6 w-6 text-blue-400" />
                  <span className="text-xs font-mono text-slate-400">
                    Type {item.code}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FREE RESOURCES SECTION */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <Badge variant="emerald" className="mb-2">
              <Sparkles className="h-3 w-3 mr-1" />
              ₹0 · Open Access Sample Resources
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight text-[#0B1528] sm:text-3xl">
              Free Formula Sheets &amp; Previews
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Try EC Vault with free sample formula sheets before purchasing any bundle.
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/search?free=true">All Free Resources</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {freeResources.map(({ subject, resource }) => (
            <Card key={resource.id} className="flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <Badge variant="emerald">Free (₹0)</Badge>
                  <span className="text-[11px] font-mono text-slate-400">
                    {resource.version}
                  </span>
                </div>
                <CardTitle className="text-sm font-semibold">
                  {resource.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 flex flex-col gap-3">
                <p className="text-xs text-slate-600 line-clamp-2">
                  {resource.description}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <Link
                    href={`/reader/${resource.id}`}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Open in Reader →
                  </Link>
                  <Link
                    href={`/subjects/${subject.slug}`}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    Subject Page
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 7. HOW EC VAULT WORKS */}
      <section className="border-y border-slate-200/80 bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-[#0B1528] sm:text-3xl">
              How EC Vault works
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Built for focused exam preparation without scattered folders or bloated textbooks.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                icon: GraduationCap,
                title: "Pick Your Year, Semester & Subject",
                desc: "Filter by IIT-level master curriculum or check your university mapping status.",
              },
              {
                step: "02",
                icon: ShieldCheck,
                title: "Preview Free & Unlock Affordably",
                desc: "Read free preview pages first. Unlock single subjects (₹19–₹39) or full semesters (₹99) via Razorpay UPI/Cards.",
              },
              {
                step: "03",
                icon: BookOpenCheck,
                title: "Study in the Protected PDF Reader",
                desc: "Track chapter progress, bookmark key derivations, and access short-lived signed PDFs anytime.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs font-semibold text-slate-400">
                    STEP {item.step}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[#0B1528]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PRICING PREVIEW */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <Badge variant="blue" className="mb-2">Student-First Pricing</Badge>
            <h2 className="text-2xl font-bold tracking-tight text-[#0B1528] sm:text-3xl">
              Simple, transparent pricing in INR
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Start free or unlock an entire 4-year B.Tech ECE library for ₹499.
            </p>
          </div>
          <Button variant="primary" size="sm" asChild>
            <Link href="/pricing">Compare All Plans</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {PRICING_BUNDLES.map((bundle) => (
            <Card
              key={bundle.id}
              className={`flex flex-col justify-between ${
                bundle.productType === "four_year"
                  ? "border-blue-600 ring-1 ring-blue-600/20"
                  : ""
              }`}
            >
              <CardHeader className="pb-3">
                {bundle.badge && (
                  <Badge
                    variant={bundle.productType === "four_year" ? "blue" : "slate"}
                    className="w-fit mb-2"
                  >
                    {bundle.badge}
                  </Badge>
                )}
                <CardTitle className="text-base">{bundle.title}</CardTitle>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#0B1528]">
                    {bundle.priceInr === 0 ? "₹0" : `₹${bundle.priceInr}`}
                  </span>
                  {bundle.mrpInr > bundle.priceInr && (
                    <span className="text-xs text-slate-400 line-through">
                      ₹{bundle.mrpInr}
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {bundle.contentsSummary.map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={bundle.productType === "four_year" ? "primary" : "outline"}
                  size="sm"
                  className="w-full mt-2"
                  asChild
                >
                  <Link href={`/checkout?sku=${bundle.sku}`}>
                    {bundle.priceInr === 0 ? "Explore Free" : "Select Plan"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 9. DEMO TESTIMONIALS (CLEARLY MARKED) */}
      <section className="border-y border-slate-200/80 bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            <div>
              <Badge variant="amber" className="mb-2">
                Demo Content · Placeholder Until Verified Student Reviews
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight text-[#0B1528]">
                Student Feedback Preview
              </h2>
            </div>
            <Link
              href="/contact?kind=feedback"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Submit Real Feedback →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {DEMO_TESTIMONIALS.map((t) => (
              <Card key={t.name} className="bg-white">
                <CardContent className="pt-6 space-y-3">
                  <p className="text-sm text-slate-600 italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-sm font-semibold text-[#0B1528]">
                      {t.name}
                    </div>
                    <div className="text-xs text-slate-500">{t.college}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-[#0B1528] sm:text-3xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <h3 className="text-base font-semibold text-[#0B1528]">{item.q}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
