"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  CreditCard,
  Lock,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { PRICING_BUNDLES, SAMPLE_COUPONS, calculateDiscount } from "@/lib/pricing";
import { getSubjectBySlug } from "@/lib/curriculum-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const sku = searchParams.get("sku") ?? "ECV-SEM-PACK";
  const subjectSlug = searchParams.get("subject") ?? undefined;

  const subject = subjectSlug ? getSubjectBySlug(subjectSlug) : undefined;
  const bundle = PRICING_BUNDLES.find((b) => b.sku === sku) ?? PRICING_BUNDLES[2];

  const basePrice =
    sku === "ECV-SUB-CORE" && subject ? subject.collectionPriceInr : bundle.priceInr;
  const itemTitle =
    sku === "ECV-SUB-CORE" && subject
      ? `${subject.title} — Complete 4-in-1 Collection`
      : bundle.title;

  const [couponInput, setCouponInput] = useState("");
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [orderNotice, setOrderNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [verifiedReceipt, setVerifiedReceipt] = useState<{
    orderId: string;
    paymentId: string;
    mode: string;
  } | null>(null);

  const appliedCoupon = appliedCouponCode
    ? SAMPLE_COUPONS.find((c) => c.code === appliedCouponCode) ?? null
    : null;
  const { discountInr, totalInr } = calculateDiscount(basePrice, appliedCoupon);

  const handleApplyCoupon = () => {
    setCouponError(null);
    const code = couponInput.trim().toUpperCase();
    const found = SAMPLE_COUPONS.find((c) => c.code === code && c.isActive);
    if (!found) {
      setCouponError("Coupon not recognized. Try ECEWELCOME20 or SEMESTER15.");
      setAppliedCouponCode(null);
      return;
    }
    if (basePrice < found.minOrderInr) {
      setCouponError(`Minimum order of ₹${found.minOrderInr} required for ${found.code}.`);
      return;
    }
    setAppliedCouponCode(found.code);
  };

  const handleCheckout = async () => {
    setError(null);
    setOrderNotice(null);
    setLoading(true);
    try {
      const createRes = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSku: sku,
          subjectSlug,
          couponCode: appliedCouponCode ?? undefined,
        }),
      });
      const orderData = await createRes.json();
      if (!createRes.ok) {
        throw new Error(orderData.error ?? "Failed to create order");
      }

      if (orderData.mode === "sandbox") {
        setOrderNotice(orderData.notice);
        // Complete clearly-labelled sandbox verification
        const verifyRes = await fetch("/api/checkout/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: orderData.orderId,
            mode: "sandbox",
            productSku: sku,
            subjectSlug,
          }),
        });
        const verifyData = await verifyRes.json();
        if (!verifyRes.ok) {
          throw new Error(verifyData.error ?? "Sandbox verification failed");
        }
        setVerifiedReceipt({
          orderId: verifyData.orderId,
          paymentId: verifyData.razorpayPaymentId,
          mode: "sandbox",
        });
      } else {
        // Live/Test Razorpay Checkout flow (requires Razorpay script in production)
        setOrderNotice(
          `Server created Razorpay Order ${orderData.razorpayOrderId}. In production with Razorpay Checkout.js loaded, the UPI/Card modal opens and posts signature to /api/checkout/verify.`
        );
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Badge variant="blue" className="mb-2">
          Razorpay Indian Checkout Architecture
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-[#0B1528]">
          Complete Your Order
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Supports UPI, Debit/Credit Cards, and Netbanking via server-verified Razorpay orders.
        </p>
      </div>

      {verifiedReceipt ? (
        <Card className="border-emerald-200 bg-emerald-50/50">
          <CardContent className="p-8 text-center space-y-4">
            <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
            <Badge variant="amber">
              {verifiedReceipt.mode === "sandbox"
                ? "Sandbox / Demo Payment Receipt"
                : "Verified Razorpay Payment"}
            </Badge>
            <h2 className="text-2xl font-bold text-[#0B1528]">
              Order Confirmed!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Order <strong>{verifiedReceipt.orderId}</strong> (Ref:{" "}
              <span className="font-mono">{verifiedReceipt.paymentId}</span>) has
              been verified on the server.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <Button variant="primary" asChild>
                <Link href="/dashboard">Go to Student Dashboard</Link>
              </Button>
              {subject && (
                <Button variant="outline" asChild>
                  <Link href={`/subjects/${subject.slug}`}>
                    Back to {subject.title}
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-mono text-slate-500">SKU: {sku}</div>
                <div className="text-base font-semibold text-[#0B1528] mt-1">
                  {itemTitle}
                </div>
                <p className="text-xs text-slate-600 mt-1">{bundle.description}</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Have a student coupon?
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="ECEWELCOME20 or SEMESTER15"
                      className="pl-9 uppercase"
                    />
                  </div>
                  <Button type="button" variant="outline" onClick={handleApplyCoupon}>
                    Apply
                  </Button>
                </div>
                {couponError && (
                  <p className="text-xs text-red-600 mt-1.5">{couponError}</p>
                )}
                {appliedCoupon && (
                  <p className="text-xs text-emerald-700 mt-1.5">
                    Applied {appliedCoupon.code}: −₹{discountInr}
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  If Razorpay API credentials are not configured in{" "}
                  <code>.env.local</code>, checkout automatically runs in a
                  clearly labelled <strong>Sandbox / Demo mode</strong> without
                  charging real money.
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 h-fit">
            <CardHeader>
              <CardTitle className="text-lg">Payment Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>₹{basePrice}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon Discount</span>
                  <span>−₹{discountInr}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-base text-[#0B1528]">
                  <span>Total Payable</span>
                  <span>₹{totalInr}</span>
                </div>
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                  {error}
                </div>
              )}

              {orderNotice && (
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800">
                  {orderNotice}
                </div>
              )}

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleCheckout}
                disabled={loading}
              >
                <CreditCard className="h-4 w-4" />
                {loading ? "Processing..." : `Pay ₹${totalInr} Securely`}
              </Button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <Lock className="h-3 w-3" />
                <span>Server-side HMAC signature verification</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="h-3 w-3 text-blue-600" />
                <span>UPI · Visa · Mastercard · RuPay · Netbanking</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-4xl px-4 py-12 text-sm text-slate-500">
          Loading checkout...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}

