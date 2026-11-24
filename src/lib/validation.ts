import { z } from "zod";

export const createOrderSchema = z.object({
  productSku: z.string().min(2),
  subjectSlug: z.string().optional(),
  semesterNumber: z.number().int().min(1).max(8).optional(),
  yearNumber: z.number().int().min(1).max(4).optional(),
  couponCode: z.string().trim().max(32).optional(),
});

export const verifyPaymentSchema = z.object({
  orderId: z.string().min(2),
  mode: z.enum(["razorpay", "sandbox"]),
  razorpayOrderId: z.string().optional(),
  razorpayPaymentId: z.string().optional(),
  razorpaySignature: z.string().optional(),
  productSku: z.string().min(2),
  subjectSlug: z.string().optional(),
});

export const feedbackSchema = z.object({
  kind: z.enum(["contact", "feedback", "error_report", "subject_request"]),
  subjectSlug: z.string().optional(),
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email address"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

export const adminSubjectSchema = z.object({
  title: z.string().trim().min(3).max(150),
  slug: z.string().trim().min(2).max(120),
  yearNumber: z.coerce.number().int().min(1).max(4),
  semesterNumber: z.coerce.number().int().min(1).max(8),
  description: z.string().trim().min(10).max(1000),
  difficulty: z.enum(["Foundational", "Intermediate", "Advanced"]),
  estimatedHours: z.coerce.number().int().min(1).max(200),
  collectionPriceInr: z.coerce.number().int().min(0).max(999),
  isElective: z.boolean().default(false),
  isLab: z.boolean().default(false),
  isPublished: z.boolean().default(true),
});

export const adminCouponSchema = z.object({
  code: z.string().trim().min(3).max(32).transform((v) => v.toUpperCase()),
  description: z.string().trim().min(4).max(200),
  discountType: z.enum(["percent", "flat"]),
  discountValue: z.coerce.number().int().min(1).max(1000),
  minOrderInr: z.coerce.number().int().min(0).max(5000),
});

