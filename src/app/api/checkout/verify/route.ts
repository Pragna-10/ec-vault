import { NextResponse } from "next/server";
import { verifyPaymentSchema } from "@/lib/validation";
import { isRazorpayConfigured, verifyRazorpaySignature } from "@/lib/razorpay";
import { createAdminSupabase, getAuthenticatedUserWithRole } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = verifyPaymentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payment verification payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const {
      orderId,
      mode,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      productSku,
      subjectSlug,
    } = parsed.data;

    const { user, supabaseConfigured } = await getAuthenticatedUserWithRole();
    if (supabaseConfigured && !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (mode === "razorpay") {
      if (!isRazorpayConfigured()) {
        return NextResponse.json(
          { error: "Razorpay is not configured on the server" },
          { status: 400 }
        );
      }

      if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
        return NextResponse.json(
          { error: "Missing Razorpay payment signature fields" },
          { status: 400 }
        );
      }

      const isValid = verifyRazorpaySignature({
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
      });

      if (!isValid) {
        return NextResponse.json(
          { error: "Payment signature verification failed. Access not granted." },
          { status: 403 }
        );
      }

      const adminDb = createAdminSupabase();
      if (adminDb && user) {
        const { data: orderRow } = await adminDb
          .from("orders")
          .update({ status: "paid" })
          .eq("razorpay_order_id", razorpayOrderId)
          .eq("user_id", user.id)
          .select("id, total_inr")
          .single();

        if (orderRow) {
          await adminDb.from("payments").insert({
            order_id: orderRow.id,
            provider: "razorpay",
            razorpay_order_id: razorpayOrderId,
            razorpay_payment_id: razorpayPaymentId,
            razorpay_signature: razorpaySignature,
            amount_paise: orderRow.total_inr * 100,
            status: "captured",
            verified_at: new Date().toISOString(),
          });

          await adminDb.from("entitlements").insert({
            user_id: user.id,
            order_id: orderRow.id,
            scope:
              productSku === "ECV-4YR-ALL"
                ? "four_year"
                : productSku === "ECV-YEAR-PACK"
                ? "year"
                : productSku === "ECV-SEM-PACK"
                ? "semester"
                : "subject",
            is_active: true,
          });
        }
      }

      return NextResponse.json({
        verified: true,
        mode: "razorpay",
        orderId,
        razorpayPaymentId,
        entitlementGranted: true,
        productSku,
        subjectSlug: subjectSlug ?? null,
      });
    }

    // Clearly labelled Sandbox verification (only allowed when Razorpay is NOT configured)
    if (isRazorpayConfigured()) {
      return NextResponse.json(
        { error: "Sandbox verification is disabled when live/test Razorpay keys are active." },
        { status: 403 }
      );
    }

    return NextResponse.json({
      verified: true,
      mode: "sandbox",
      orderId,
      razorpayPaymentId: `sandbox_pay_${Date.now()}`,
      entitlementGranted: true,
      productSku,
      subjectSlug: subjectSlug ?? null,
      notice:
        "Sandbox/Demo verification completed. Configure Razorpay keys in .env.local for live Indian UPI/Card payments.",
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
      { error: "Payment verification error" },
      { status: 500 }
    );
  }
}

