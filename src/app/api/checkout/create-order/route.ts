import { NextResponse } from "next/server";
import { createOrderSchema } from "@/lib/validation";
import { PRICING_BUNDLES, SAMPLE_COUPONS, calculateDiscount } from "@/lib/pricing";
import { getSubjectBySlug } from "@/lib/curriculum-data";
import { getRazorpayInstance, isRazorpayConfigured } from "@/lib/razorpay";
import { createAdminSupabase, getAuthenticatedUserWithRole } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid checkout request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { productSku, subjectSlug, couponCode } = parsed.data;

    // 1. Resolve authoritative server-side price (never trust client price)
    let title = "";
    let subtotalInr = 0;

    if (productSku === "ECV-SUB-CORE" && subjectSlug) {
      const subject = getSubjectBySlug(subjectSlug);
      if (!subject) {
        return NextResponse.json({ error: "Subject not found" }, { status: 404 });
      }
      title = `${subject.title} — Complete 4-in-1 Collection`;
      subtotalInr = subject.collectionPriceInr;
    } else {
      const bundle = PRICING_BUNDLES.find((b) => b.sku === productSku);
      if (!bundle) {
        return NextResponse.json({ error: "Product SKU not found" }, { status: 404 });
      }
      title = bundle.title;
      subtotalInr = bundle.priceInr;
    }

    // 2. Apply coupon server-side
    const normalizedCode = couponCode?.trim().toUpperCase();
    const coupon = normalizedCode
      ? SAMPLE_COUPONS.find((c) => c.code === normalizedCode && c.isActive)
      : null;

    if (normalizedCode && !coupon) {
      return NextResponse.json({ error: "Invalid or expired coupon code" }, { status: 400 });
    }

    const { discountInr, totalInr } = calculateDiscount(subtotalInr, coupon);

    const { user, supabaseConfigured } = await getAuthenticatedUserWithRole();
    if (supabaseConfigured && !user) {
      return NextResponse.json(
        { error: "Authentication required to create an order" },
        { status: 401 }
      );
    }

    const orderNumber = `ECV-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 3. Create Razorpay Order if credentials exist; otherwise return clearly labelled Sandbox Order
    if (isRazorpayConfigured() && totalInr > 0) {
      const razorpay = getRazorpayInstance();
      if (!razorpay) {
        return NextResponse.json(
          { error: "Razorpay initialization failed" },
          { status: 500 }
        );
      }

      const rzpOrder = await razorpay.orders.create({
        amount: totalInr * 100, // paise
        currency: "INR",
        receipt: orderNumber,
        notes: {
          productSku,
          subjectSlug: subjectSlug ?? "",
          userId: user?.id ?? "guest",
        },
      });

      const adminDb = createAdminSupabase();
      if (adminDb && user) {
        await adminDb.from("orders").insert({
          user_id: user.id,
          order_number: orderNumber,
          subtotal_inr: subtotalInr,
          discount_inr: discountInr,
          total_inr: totalInr,
          status: "created",
          razorpay_order_id: rzpOrder.id,
        });
      }

      return NextResponse.json({
        mode: "razorpay",
        orderId: orderNumber,
        razorpayOrderId: rzpOrder.id,
        razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amountPaise: totalInr * 100,
        subtotalInr,
        discountInr,
        totalInr,
        title,
      });
    }

    // Sandbox / Demo mode when Razorpay keys are not configured
    return NextResponse.json({
      mode: "sandbox",
      orderId: orderNumber,
      razorpayOrderId: `sandbox_order_${orderNumber}`,
      amountPaise: totalInr * 100,
      subtotalInr,
      discountInr,
      totalInr,
      title,
      notice:
        "Razorpay API credentials are not configured. Running in Sandbox/Demo Checkout mode — no real money is charged.",
    });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: "Unable to create order" },
      { status: 500 }
    );
  }
}

