import Link from "next/link";
import { CheckCircle2, ShieldCheck, Sparkles, Tag } from "lucide-react";
import { PRICING_BUNDLES, SAMPLE_COUPONS } from "@/lib/pricing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Pricing & Student Bundles",
  description:
    "Affordable B.Tech ECE study packs: Free resources (₹0), Individual Subject (₹19–₹39), Semester (₹99), Year (₹179), and Four-Year Complete Vault (₹499).",
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
        <Badge variant="blue" className="mb-3">
          Student-Friendly Indian Pricing
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-[#0B1528] sm:text-5xl">
          Transparent Pricing for Every Semester
        </h1>
        <p className="mt-4 text-base text-slate-600 leading-relaxed">
          Start with ₹0 free formula sheets, unlock a single subject for ₹19–₹39,
          or save over 65% with Semester, Year, and Four-Year bundles.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-14">
        {PRICING_BUNDLES.map((bundle) => {
          const isBestValue = bundle.productType === "four_year";
          const savingsPercent =
            bundle.mrpInr > bundle.priceInr
              ? Math.round(((bundle.mrpInr - bundle.priceInr) / bundle.mrpInr) * 100)
              : 0;

          return (
            <Card
              key={bundle.id}
              className={`relative flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                isBestValue
                  ? "border-blue-600 ring-2 ring-blue-600/20 shadow-md"
                  : "border-slate-200"
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between gap-2 mb-2">
                  {bundle.badge && (
                    <Badge variant={isBestValue ? "blue" : "slate"}>
                      {isBestValue && <Sparkles className="h-3 w-3 mr-1" />}
                      {bundle.badge}
                    </Badge>
                  )}
                  {savingsPercent > 0 && (
                    <Badge variant="emerald">Save {savingsPercent}%</Badge>
                  )}
                </div>
                <CardTitle className="text-xl text-[#0B1528]">
                  {bundle.title}
                </CardTitle>
                <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                  {bundle.description}
                </p>
                <div className="mt-5 flex items-baseline gap-2.5">
                  <span className="text-4xl font-bold tracking-tight text-[#0B1528]">
                    {bundle.priceInr === 0 ? "₹0" : `₹${bundle.priceInr}`}
                  </span>
                  {bundle.mrpInr > bundle.priceInr && (
                    <span className="text-sm text-slate-400 line-through">
                      ₹{bundle.mrpInr}
                    </span>
                  )}
                  <span className="text-xs text-slate-500">INR</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="border-t border-slate-100 pt-4">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-3">
                    Exact Bundle Contents
                  </div>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    {bundle.contentsSummary.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant={isBestValue ? "primary" : "default"}
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <Link
                    href={
                      bundle.priceInr === 0
                        ? "/search?free=true"
                        : `/checkout?sku=${bundle.sku}`
                    }
                  >
                    {bundle.priceInr === 0
                      ? "Browse Free Resources"
                      : "Proceed to Checkout"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Active Promotional Coupons */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-bold text-[#0B1528]">
              Active Promotional Coupons
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            Verified via Razorpay UPI / Cards / Netbanking
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SAMPLE_COUPONS.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-dashed border-blue-300 bg-white p-4 flex items-center justify-between"
            >
              <div>
                <div className="font-mono text-sm font-bold text-blue-700">
                  {c.code}
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  {c.description}
                </div>
              </div>
              <Badge variant="blue">Min ₹{c.minOrderInr}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
