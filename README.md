# EC Vault

**Four years of ECE. One place.**  
*Understand concepts. Master formulas. Prepare smarter.*

EC Vault is a full-stack academic resource marketplace built for **B.Tech Electronics and Communication Engineering (ECE)** undergraduate students across India. It pairs a consolidated 4-year IIT-level master curriculum with a separate 8-IIT curriculum mapping explorer, dual-edition (Professional Digital + Handwritten-Style) study packs, protected PDF viewing, Razorpay Indian checkout, and an admin CMS.

---

## Key Features

- **4-Year B.Tech ECE Curriculum Library (`/curriculum`, `/search`)**: 40+ core courses, electives, and laboratory modules organized across Years 1–4 and Semesters 1–8 with multi-facet search (year, semester, topic, resource type, difficulty, free-only).
- **Separate 8-IIT Curriculum Mapping (`/iit-mapping`)**: Official undergraduate ECE/EE curriculum structures from IIT Bombay, IIT Delhi, IIT Madras, IIT Kanpur, IIT Kharagpur, IIT Guwahati, IIT Hyderabad, and IIT Roorkee — stored separately from the master syllabus with source URLs and verification dates.
- **Original IIT-Level Core Content (`/subjects/[slug]`)**:
  - Full original study packs (chapter checklist, SI-unit formula sheet, revision notes, derivations, SVG circuit/block diagrams, solved numericals, and conceptual/exam Q&A) for **Network Theory**, **Electronic Devices**, **Analog Electronic Circuits**, **Digital Electronics**, and **Signals and Systems**.
  - **Network Theory Pilot Package** (`content/year-2/semester-3/network-theory/`): Complete Markdown/JSON sources, editable HTML+KaTeX sources, searchable PDFs, and PNG preview images for both **Professional Digital** and **Handwritten-Style** editions.
- **Protected PDF Reader (`/reader/[id]`)**: Server-verified access control (`/api/resources/[id]/access`), 120-second signed Supabase Storage URLs, zoom controls, chapter progress tracking, bookmarks, and watermarked preview mode.
- **Indian Marketplace & Razorpay Checkout (`/pricing`, `/checkout`)**:
  - Tiers: Free Resources (`₹0`), Individual Subject (`₹19–₹39`), Semester Bundle (`₹99`), Academic Year Bundle (`₹179`), and 4-Year Complete Vault (`₹499`).
  - Server-side order creation, coupon validation (`ECEWELCOME20`, `SEMESTER15`), and HMAC-SHA256 signature verification (`/api/checkout/create-order`, `/api/checkout/verify`), with automatic **Sandbox / Demo** fallback when Razorpay keys are not configured.
- **Authentication, Student Dashboard & Admin CMS (`/auth/login`, `/dashboard`, `/admin`)**: Supabase SSR authentication with session refresh middleware, student library/wishlist/order views, and role-gated Admin CMS with Row Level Security (RLS).

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 + shadcn/ui-compatible components + Lucide icons
- **Database & Auth & Storage:** Supabase (PostgreSQL, Auth SSR, Private/Public Storage Buckets, RLS)
- **Payments:** Razorpay (Server-side Orders + HMAC-SHA256 verification)
- **Validation & Forms:** Zod + React Hook Form
- **Content & PDF Pipeline:** Markdown + KaTeX + SVG + Headless Chrome PDF/PNG generator (`scripts/build_network_theory_editions.py`)

---

## Project Structure

```text
ec-vault/
├── content/
│   └── year-2/semester-3/network-theory/   # Pilot subject sources, HTML/KaTeX, PDFs & previews
├── public/previews/network-theory/        # Rendered PNG previews for digital & handwritten editions
├── scripts/
│   └── build_network_theory_editions.py   # Generates searchable PDFs & PNG previews
├── supabase/
│   ├── migrations/
│   │   ├── 0001_initial_schema.sql        # Normalized 22-table PostgreSQL schema
│   │   ├── 0002_rls_and_storage.sql       # RLS policies & storage buckets
│   │   └── 0003_official_iit_curricula.sql# Separate official IIT mapping tables
│   └── seed.sql                           # Roles, semesters, universities, coupons
├── src/
│   ├── app/                               # App Router pages & API routes
│   ├── components/                        # UI primitives, layout, subject & admin components
│   ├── lib/                               # Curriculum data, IIT mappings, pricing, Razorpay, Supabase
│   └── types/                             # TypeScript domain models
└── .env.example                           # Environment variable template
```

---

## Local Setup

1. **Install dependencies**
   ```bash
   npm install
   ```
   *(On Windows PowerShell with restricted script execution, use `npm.cmd install`.)*

2. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   You can leave `.env.local` unconfigured to evaluate the platform in local Preview / Sandbox mode.

3. **Run the development server**
   ```bash
   npm run dev
   ```
   *(Or `npm.cmd run dev` in Windows PowerShell.)*

   Open [http://localhost:3000](http://localhost:3000).

---

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com).
2. In **SQL Editor**, run the migrations in order:
   - `supabase/migrations/0001_initial_schema.sql`
   - `supabase/migrations/0002_rls_and_storage.sql`
   - `supabase/migrations/0003_official_iit_curricula.sql`
   - `supabase/seed.sql`
3. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`.
4. In **Authentication → URL Configuration**, add `http://localhost:3000/auth/callback` (and your production `/auth/callback`) to Redirect URLs.
5. Promote an admin account in SQL Editor after signing up:
   ```sql
   update public.profiles
   set role_id = (select id from public.roles where name = 'admin')
   where email = 'your-admin-email@example.com';
   ```

---

## Razorpay Setup

1. Generate API keys in the [Razorpay Dashboard](https://dashboard.razorpay.com).
2. Set `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and `RAZORPAY_WEBHOOK_SECRET` in `.env.local` (never expose secret keys in client code).

---

## Vercel Deployment

1. Push this repository to GitHub.
2. Import the repository at [vercel.com](https://vercel.com).
3. Add all environment variables from `.env.example` in **Project Settings → Environment Variables**.
4. Set `NEXT_PUBLIC_APP_URL` to your Vercel domain and deploy.
5. Verify `/api/health` returns `"databaseConnected": true` and `"razorpayConfigured": true`.
