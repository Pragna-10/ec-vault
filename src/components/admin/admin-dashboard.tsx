"use client";

import { useState } from "react";
import {
  BarChart3,
  BookOpen,
  FileUp,
  GraduationCap,
  MessageSquare,
  Plus,
  ShieldCheck,
  Tag,
  Users,
} from "lucide-react";
import { CURRICULUM_SUBJECTS } from "@/lib/curriculum-data";
import { PRICING_BUNDLES, SAMPLE_COUPONS } from "@/lib/pricing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type AdminTab =
  | "analytics"
  | "subjects"
  | "uploads"
  | "pricing"
  | "mappings"
  | "users";

export function AdminDashboardClient({
  supabaseConfigured,
  adminEmail,
}: {
  supabaseConfigured: boolean;
  adminEmail: string | null;
}) {
  const [tab, setTab] = useState<AdminTab>("analytics");
  const [subjects, setSubjects] = useState(
    CURRICULUM_SUBJECTS.map((s) => ({
      id: s.id,
      slug: s.slug,
      title: s.title,
      yearNumber: s.yearNumber,
      semesterNumber: s.semesterNumber,
      difficulty: s.difficulty,
      priceInr: s.collectionPriceInr,
      isPublished: s.isPublished,
    }))
  );
  const [coupons, setCoupons] = useState(SAMPLE_COUPONS);
  const [newSubjectTitle, setNewSubjectTitle] = useState("");
  const [newSubjectYear, setNewSubjectYear] = useState("2");
  const [newSubjectSem, setNewSubjectSem] = useState("3");
  const [newSubjectPrice, setNewSubjectPrice] = useState("29");
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponValue, setNewCouponValue] = useState("25");

  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    const slug = newSubjectTitle
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-");

    const res = await fetch("/api/admin/subjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newSubjectTitle,
        slug,
        yearNumber: Number(newSubjectYear),
        semesterNumber: Number(newSubjectSem),
        description: `${newSubjectTitle} — newly added ECE curriculum subject.`,
        difficulty: "Intermediate",
        estimatedHours: 36,
        collectionPriceInr: Number(newSubjectPrice),
        isElective: false,
        isLab: false,
        isPublished: true,
      }),
    });

    if (res.ok) {
      setSubjects((prev) => [
        {
          id: `sub-${slug}`,
          slug,
          title: newSubjectTitle,
          yearNumber: Number(newSubjectYear) as 1 | 2 | 3 | 4,
          semesterNumber: Number(newSubjectSem) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
          difficulty: "Intermediate",
          priceInr: Number(newSubjectPrice),
          isPublished: true,
        },
        ...prev,
      ]);
      setNewSubjectTitle("");
      setStatusMsg(`Subject "${newSubjectTitle}" added to catalog.`);
    } else {
      setStatusMsg("Unable to add subject. Check inputs or admin permissions.");
    }
  };

  const togglePublish = (id: string) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isPublished: !s.isPublished } : s))
    );
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    setCoupons((prev) => [
      {
        id: `c-${Date.now()}`,
        code: newCouponCode.trim().toUpperCase(),
        description: "Admin-created promotional campaign",
        discountType: "percent",
        discountValue: Number(newCouponValue),
        minOrderInr: 19,
        isActive: true,
      },
      ...prev,
    ]);
    setNewCouponCode("");
    setStatusMsg("Promotional coupon created.");
  };

  const tabs: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "subjects", label: "Subjects & CMS", icon: BookOpen },
    { id: "uploads", label: "PDFs & Previews", icon: FileUp },
    { id: "pricing", label: "Pricing & Coupons", icon: Tag },
    { id: "mappings", label: "University Mappings", icon: GraduationCap },
    { id: "users", label: "Users & Feedback", icon: Users },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <Badge variant="blue" className="mb-2">
            <ShieldCheck className="h-3 w-3 mr-1" />
            Administrator Control Center
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-[#0B1528]">
            EC Vault Admin Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {adminEmail
              ? `Authenticated Admin: ${adminEmail}`
              : supabaseConfigured
              ? "Server-side role check active."
              : "Preview Mode: Configure Supabase RLS and assign 'admin' role in profiles for production enforcement."}
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {tabs.map((t) => (
          <Button
            key={t.id}
            variant={tab === t.id ? "primary" : "outline"}
            size="sm"
            onClick={() => setTab(t.id)}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </Button>
        ))}
      </div>

      {statusMsg && (
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800">
          {statusMsg}
        </div>
      )}

      {/* TAB 1: ANALYTICS */}
      {tab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase text-slate-500">
                  Total Revenue (Verified)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#0B1528]">₹0</div>
                <p className="text-xs text-slate-500 mt-1">
                  Updates automatically from verified Razorpay orders
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase text-slate-500">
                  Published Subjects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#0B1528]">
                  {subjects.filter((s) => s.isPublished).length} / {subjects.length}
                </div>
                <p className="text-xs text-slate-500 mt-1">Across Years 1–4</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase text-slate-500">
                  Active Bundles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#0B1528]">
                  {PRICING_BUNDLES.length}
                </div>
                <p className="text-xs text-slate-500 mt-1">₹0 to ₹499 tiers</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase text-slate-500">
                  Curriculum Mappings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-700">
                  Pending Verification
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  IIT / NIT / State references
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: SUBJECTS & CMS */}
      {tab === "subjects" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Plus className="h-4 w-4 text-blue-600" />
                Add New ECE Subject
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleCreateSubject}
                className="grid grid-cols-1 gap-3 sm:grid-cols-5"
              >
                <Input
                  required
                  value={newSubjectTitle}
                  onChange={(e) => setNewSubjectTitle(e.target.value)}
                  placeholder="Subject Title (e.g., Neuromorphic Circuits)"
                  className="sm:col-span-2"
                />
                <select
                  value={newSubjectYear}
                  onChange={(e) => setNewSubjectYear(e.target.value)}
                  className="h-10 rounded-lg border border-slate-200 px-3 text-sm"
                >
                  {[1, 2, 3, 4].map((y) => (
                    <option key={y} value={String(y)}>
                      Year {y}
                    </option>
                  ))}
                </select>
                <select
                  value={newSubjectSem}
                  onChange={(e) => setNewSubjectSem(e.target.value)}
                  className="h-10 rounded-lg border border-slate-200 px-3 text-sm"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={String(s)}>
                      Sem {s}
                    </option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={newSubjectPrice}
                    onChange={(e) => setNewSubjectPrice(e.target.value)}
                    placeholder="₹"
                    className="w-20"
                  />
                  <Button type="submit" variant="primary" size="default">
                    Add
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Year / Sem</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subjects.slice(0, 15).map((s) => (
                  <tr key={s.id}>
                    <td className="px-4 py-3 font-medium text-[#0B1528]">
                      {s.title}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      Y{s.yearNumber} · Sem {s.semesterNumber}
                    </td>
                    <td className="px-4 py-3">₹{s.priceInr}</td>
                    <td className="px-4 py-3">
                      <Badge variant={s.isPublished ? "emerald" : "slate"}>
                        {s.isPublished ? "Published" : "Unpublished"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePublish(s.id)}
                      >
                        {s.isPublished ? "Unpublish" : "Publish"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PDF & PREVIEW UPLOADS */}
      {tab === "uploads" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Protected PDF &amp; Preview Upload (Supabase Storage)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-600">
            <p>
              Protected PDFs are stored in the private{" "}
              <code>ec-vault-pdfs</code> bucket and streamed via short-lived
              signed URLs. Preview images are stored in{" "}
              <code>ec-vault-previews</code>.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center space-y-2">
                <FileUp className="h-6 w-6 text-blue-600 mx-auto" />
                <div className="font-semibold text-[#0B1528]">
                  Upload Protected Study PDF
                </div>
                <p className="text-xs text-slate-500">
                  Select subject, resource type (A–D), and document style
                  (Handwritten / Typeset).
                </p>
                <input type="file" accept="application/pdf" className="text-xs" />
              </div>
              <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center space-y-2">
                <FileUp className="h-6 w-6 text-blue-600 mx-auto" />
                <div className="font-semibold text-[#0B1528]">
                  Upload Free Preview Pages
                </div>
                <p className="text-xs text-slate-500">
                  PNG/WebP/PDF first-page previews visible to non-paying visitors.
                </p>
                <input type="file" accept="image/*,application/pdf" className="text-xs" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB 4: PRICING & COUPONS */}
      {tab === "pricing" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Create Promotional Coupon</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddCoupon} className="flex flex-wrap gap-3">
                <Input
                  required
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  placeholder="COUPON CODE (e.g., GATE25)"
                  className="max-w-xs uppercase"
                />
                <Input
                  type="number"
                  value={newCouponValue}
                  onChange={(e) => setNewCouponValue(e.target.value)}
                  placeholder="% Discount"
                  className="w-28"
                />
                <Button type="submit" variant="primary">
                  Create Coupon
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {coupons.map((c) => (
              <Card key={c.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-mono font-bold text-blue-700">
                      {c.code}
                    </div>
                    <div className="text-xs text-slate-600">{c.description}</div>
                  </div>
                  <Badge variant="emerald">
                    {c.discountType === "percent"
                      ? `${c.discountValue}% OFF`
                      : `₹${c.discountValue} OFF`}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: UNIVERSITY MAPPINGS */}
      {tab === "mappings" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              University Curriculum Verification Queue
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600 space-y-3">
            <p>
              All university-specific course codes (IITs, NITs, State
              Universities) remain marked <strong>Pending Verification</strong>{" "}
              until verified against official senate/academic syllabi.
            </p>
            <Badge variant="amber">
              0 Verified Mappings · {subjects.length * 2} Pending Verification
            </Badge>
          </CardContent>
        </Card>
      )}

      {/* TAB 6: USERS & FEEDBACK */}
      {tab === "users" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              Orders, Users &amp; Student Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600 space-y-2">
            <p>
              Manage student accounts, inspect Razorpay payment logs, and review
              error reports or subject requests submitted via{" "}
              <code>/contact</code>.
            </p>
            <p className="text-xs text-slate-500">
              Connect Supabase PostgreSQL + Service Role Key in{" "}
              <code>.env.local</code> to load live rows from{" "}
              <code>profiles</code>, <code>orders</code>, and{" "}
              <code>feedback_submissions</code>.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

