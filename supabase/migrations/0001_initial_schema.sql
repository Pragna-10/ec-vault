-- EC Vault Initial Database Schema
-- Normalized PostgreSQL schema for Supabase

create extension if not exists "pgcrypto";

-- 1. Roles
create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  name text not null unique check (name in ('student', 'admin', 'editor')),
  description text,
  created_at timestamptz not null default now()
);

-- 2. Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role_id uuid references public.roles(id),
  university_name text,
  programme_name text default 'B.Tech ECE',
  current_year int check (current_year between 1 and 4),
  current_semester int check (current_semester between 1 and 8),
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_profiles_role_id on public.profiles(role_id);

-- 3. Universities
create table if not exists public.universities (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  short_name text not null,
  category text not null check (category in ('IIT', 'NIT', 'IIIT', 'State University', 'Deemed University', 'Consolidated Master')),
  location text,
  website_url text,
  created_at timestamptz not null default now()
);

-- 4. Programmes
create table if not exists public.programmes (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references public.universities(id) on delete cascade,
  name text not null,
  degree text not null default 'B.Tech',
  duration_years int not null default 4,
  created_at timestamptz not null default now(),
  unique(university_id, name, degree)
);

-- 5. Curriculum Versions
create table if not exists public.curriculum_versions (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references public.universities(id) on delete cascade,
  programme_id uuid not null references public.programmes(id) on delete cascade,
  academic_year_label text not null,
  verification_status text not null default 'pending_verification' check (verification_status in ('pending_verification', 'reference_draft', 'verified')),
  notes text,
  source_url text,
  created_at timestamptz not null default now()
);

-- 6. Semesters
create table if not exists public.semesters (
  id uuid primary key default gen_random_uuid(),
  year_number int not null check (year_number between 1 and 4),
  semester_number int not null unique check (semester_number between 1 and 8),
  title text not null,
  description text,
  created_at timestamptz not null default now()
);

-- 7. Subjects
create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  semester_id uuid not null references public.semesters(id) on delete restrict,
  year_number int not null check (year_number between 1 and 4),
  semester_number int not null check (semester_number between 1 and 8),
  description text not null,
  difficulty text not null check (difficulty in ('Foundational', 'Intermediate', 'Advanced')),
  estimated_hours int not null default 30,
  is_elective boolean not null default false,
  is_lab boolean not null default false,
  is_popular boolean not null default false,
  is_published boolean not null default true,
  learning_outcomes jsonb not null default '[]'::jsonb,
  reference_resources jsonb not null default '[]'::jsonb,
  related_subject_slugs text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_subjects_year_sem on public.subjects(year_number, semester_number);
create index if not exists idx_subjects_slug on public.subjects(slug);

-- University Curriculum Mappings (explicitly tracks verification status)
create table if not exists public.curriculum_mappings (
  id uuid primary key default gen_random_uuid(),
  curriculum_version_id uuid not null references public.curriculum_versions(id) on delete cascade,
  subject_id uuid references public.subjects(id) on delete set null,
  semester_number int not null check (semester_number between 1 and 8),
  course_code text,
  course_name text not null,
  credits numeric(4,1),
  topics jsonb not null default '[]'::jsonb,
  verification_status text not null default 'pending_verification' check (verification_status in ('pending_verification', 'reference_draft', 'verified')),
  created_at timestamptz not null default now()
);

create index if not exists idx_curriculum_mappings_version on public.curriculum_mappings(curriculum_version_id);

-- 8. Chapters (with consistent educational quality template)
create table if not exists public.chapters (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  chapter_number int not null,
  title text not null,
  summary text,
  content_template jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique(subject_id, chapter_number)
);

-- 9. Topics
create table if not exists public.topics (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references public.chapters(id) on delete cascade,
  title text not null,
  slug text not null,
  order_index int not null default 1,
  created_at timestamptz not null default now()
);

create index if not exists idx_topics_chapter on public.topics(chapter_id);

-- 10. Resources (4 material types + 2 document styles)
create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  title text not null,
  resource_type text not null check (resource_type in ('formula_sheet', 'concise_notes', 'numerical_handbook', 'exam_revision')),
  document_style text not null check (document_style in ('handwritten', 'typeset')),
  description text not null,
  chapter_list jsonb not null default '[]'::jsonb,
  version text not null default 'v1.0-sample',
  page_count int not null default 1,
  storage_path text,
  is_free boolean not null default false,
  price_inr int not null default 0 check (price_inr >= 0),
  allow_download boolean not null default false,
  is_sample_demo boolean not null default true,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_resources_subject on public.resources(subject_id);
create index if not exists idx_resources_type on public.resources(resource_type);

-- 11. Resource Previews
create table if not exists public.resource_previews (
  id uuid primary key default gen_random_uuid(),
  resource_id uuid not null references public.resources(id) on delete cascade,
  page_number int not null,
  preview_path text not null,
  caption text,
  created_at timestamptz not null default now(),
  unique(resource_id, page_number)
);

-- 12. Products (purchasable SKUs)
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  sku text not null unique,
  product_type text not null check (product_type in ('resource', 'subject', 'semester', 'year', 'four_year')),
  title text not null,
  slug text not null unique,
  description text not null,
  price_inr int not null check (price_inr >= 0),
  mrp_inr int not null check (mrp_inr >= 0),
  subject_id uuid references public.subjects(id) on delete set null,
  semester_id uuid references public.semesters(id) on delete set null,
  year_number int check (year_number between 1 and 4),
  contents_summary jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 13. Bundles
create table if not exists public.bundles (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null unique references public.products(id) on delete cascade,
  title text not null,
  bundle_scope text not null check (bundle_scope in ('subject', 'semester', 'year', 'four_year')),
  discount_percent int not null default 0 check (discount_percent between 0 and 100),
  created_at timestamptz not null default now()
);

-- 14. Bundle Items
create table if not exists public.bundle_items (
  id uuid primary key default gen_random_uuid(),
  bundle_id uuid not null references public.bundles(id) on delete cascade,
  subject_id uuid references public.subjects(id) on delete cascade,
  resource_id uuid references public.resources(id) on delete cascade,
  item_label text not null,
  created_at timestamptz not null default now()
);

-- 15. Coupons
create table if not exists public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  description text,
  discount_type text not null check (discount_type in ('percent', 'flat')),
  discount_value int not null check (discount_value > 0),
  min_order_inr int not null default 0,
  max_uses int,
  used_count int not null default 0,
  valid_from timestamptz not null default now(),
  valid_until timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 16. Orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  order_number text not null unique,
  subtotal_inr int not null check (subtotal_inr >= 0),
  discount_inr int not null default 0 check (discount_inr >= 0),
  total_inr int not null check (total_inr >= 0),
  coupon_id uuid references public.coupons(id) on delete set null,
  currency text not null default 'INR',
  status text not null default 'created' check (status in ('created', 'paid', 'failed', 'refunded', 'sandbox_paid')),
  razorpay_order_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_orders_user on public.orders(user_id);

-- 17. Order Items
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  title_snapshot text not null,
  price_inr int not null check (price_inr >= 0),
  created_at timestamptz not null default now()
);

-- 18. Payments
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null check (provider in ('razorpay', 'sandbox')),
  razorpay_order_id text,
  razorpay_payment_id text unique,
  razorpay_signature text,
  amount_paise int not null check (amount_paise >= 0),
  status text not null default 'pending' check (status in ('pending', 'captured', 'failed', 'sandbox_verified')),
  verified_at timestamptz,
  raw_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- 19. Entitlements
create table if not exists public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  subject_id uuid references public.subjects(id) on delete cascade,
  resource_id uuid references public.resources(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  scope text not null default 'resource' check (scope in ('resource', 'subject', 'semester', 'year', 'four_year')),
  semester_number int,
  year_number int,
  granted_at timestamptz not null default now(),
  expires_at timestamptz,
  is_active boolean not null default true
);

create index if not exists idx_entitlements_user on public.entitlements(user_id);

-- 20. Bookmarks & Wishlist & Progress
create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id uuid references public.subjects(id) on delete cascade,
  resource_id uuid references public.resources(id) on delete cascade,
  kind text not null check (kind in ('bookmark', 'wishlist', 'progress')),
  last_page int not null default 1,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_bookmarks_user on public.bookmarks(user_id);

-- 21. Reviews
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  comment text not null,
  is_verified_purchase boolean not null default false,
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- 22. Feedback, Error Reports, Subject Requests & Contact
create table if not exists public.feedback_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  kind text not null check (kind in ('contact', 'feedback', 'error_report', 'subject_request')),
  subject_id uuid references public.subjects(id) on delete set null,
  name text not null,
  email text not null,
  message text not null,
  status text not null default 'open' check (status in ('open', 'in_review', 'resolved')),
  created_at timestamptz not null default now()
);

-- Trigger to auto-create profile and assign student role on auth.users insert
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  student_role_id uuid;
begin
  select id into student_role_id from public.roles where name = 'student' limit 1;
  insert into public.profiles (id, email, full_name, role_id)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    student_role_id
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

