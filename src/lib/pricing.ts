import { ProductBundle, Coupon } from "@/types/database";

export const PRICING_BUNDLES: ProductBundle[] = [
  {
    id: "bundle-free",
    sku: "ECV-FREE-00",
    productType: "resource",
    title: "Free Starter & Formula Previews",
    slug: "free-starter-pack",
    description:
      "Access free sample formula cheat sheets, syllabus roadmaps, and chapter preview pages across core ECE subjects.",
    priceInr: 0,
    mrpInr: 0,
    badge: "Free Forever",
    contentsSummary: [
      "Selected 1-page Formula Cheat Sheets (Sample/Demo)",
      "Consolidated 4-Year ECE Master Curriculum Map",
      "First-page previews of all paid study collections",
      "NPTEL & MIT OCW curated reference links",
    ],
  },
  {
    id: "bundle-subject-single",
    sku: "ECV-SUB-CORE",
    productType: "subject",
    title: "Individual Subject Collection",
    slug: "individual-subject-collection",
    description:
      "Complete 4-in-1 study pack for any single ECE subject, available in both Handwritten-style and Typeset editions.",
    priceInr: 29,
    mrpInr: 59,
    badge: "₹19 – ₹39 per subject",
    contentsSummary: [
      "A. One-Page Formula Cheat Sheet",
      "B. Chapter-wise Concise Notes (Full Syllabus)",
      "C. Solved Numerical Handbook",
      "D. Exam Revision Pack (Derivations + Q&A)",
    ],
  },
  {
    id: "bundle-semester",
    sku: "ECV-SEM-PACK",
    productType: "semester",
    title: "Semester Complete Collection",
    slug: "semester-collection",
    description:
      "All core subjects, labs, and electives for any single semester (Semesters 1–8) bundled at an affordable student price.",
    priceInr: 99,
    mrpInr: 249,
    badge: "Best for Sem Exams",
    contentsSummary: [
      "All 5–7 subjects in your chosen semester",
      "All 4 material types per subject",
      "Both Handwritten-style & Typeset PDF editions",
      "Lab manual & viva preparation guides",
    ],
  },
  {
    id: "bundle-year",
    sku: "ECV-YEAR-PACK",
    productType: "year",
    title: "Academic Year Collection",
    slug: "academic-year-collection",
    description:
      "Full 2-semester academic year bundle (Year 1, Year 2, Year 3, or Year 4) with all core and elective resources.",
    priceInr: 179,
    mrpInr: 499,
    badge: "Save 64%",
    contentsSummary: [
      "Both semesters of the selected academic year",
      "10–14 complete subject collections",
      "All formula sheets, concise notes & numericals",
      "Free updates for the academic year",
    ],
  },
  {
    id: "bundle-four-year",
    sku: "ECV-4YR-ALL",
    productType: "four_year",
    title: "Four-Year Complete ECE Vault",
    slug: "four-year-ece-collection",
    description:
      "Unrestricted access to all 4 years (8 semesters), 40+ B.Tech ECE subjects, electives, labs, and future curriculum updates.",
    priceInr: 499,
    mrpInr: 1499,
    badge: "Complete B.Tech Access",
    contentsSummary: [
      "All 8 Semesters (Year 1 to Year 4)",
      "40+ Core, Lab & Elective ECE Subjects",
      "Handwritten-style + Professionally Typeset Notes",
      "GATE/Placement Formula Sheets & Revision Packs",
    ],
  },
];

export const SAMPLE_COUPONS: Coupon[] = [
  {
    id: "coupon-welcome",
    code: "ECEWELCOME20",
    description: "20% student welcome discount on any paid collection",
    discountType: "percent",
    discountValue: 20,
    minOrderInr: 19,
    isActive: true,
  },
  {
    id: "coupon-sem15",
    code: "SEMESTER15",
    description: "Flat ₹15 off on Semester, Year, or 4-Year bundles",
    discountType: "flat",
    discountValue: 15,
    minOrderInr: 99,
    isActive: true,
  },
];

export function calculateDiscount(
  subtotalInr: number,
  coupon?: Coupon | null
): { discountInr: number; totalInr: number } {
  if (!coupon || !coupon.isActive || subtotalInr < coupon.minOrderInr) {
    return { discountInr: 0, totalInr: subtotalInr };
  }
  const rawDiscount =
    coupon.discountType === "percent"
      ? Math.round((subtotalInr * coupon.discountValue) / 100)
      : coupon.discountValue;
  const discountInr = Math.min(rawDiscount, subtotalInr);
  return {
    discountInr,
    totalInr: Math.max(0, subtotalInr - discountInr),
  };
}

