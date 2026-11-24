-- Separate table for Official IIT Curriculum Reference Data
-- Kept strictly separate from the consolidated master syllabus (public.subjects)

create table if not exists public.official_iit_curricula (
  id uuid primary key default gen_random_uuid(),
  short_code text not null unique,
  institute_name text not null,
  degree_title text not null,
  department_name text not null,
  source_url text not null,
  verified_at date not null default '2026-11-24',
  verification_note text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.official_iit_course_mappings (
  id uuid primary key default gen_random_uuid(),
  iit_id uuid not null references public.official_iit_curricula(id) on delete cascade,
  category text not null check (category in (
    'common_compulsory',
    'math_foundations',
    'electronics_core',
    'communication',
    'signal_processing',
    'vlsi_semiconductor',
    'embedded_systems',
    'computer_engineering',
    'advanced_electives',
    'labs_and_projects'
  )),
  official_course_name text not null,
  official_course_code text not null default 'Not listed in retrieved summary',
  typical_semester text,
  master_subject_slug text references public.subjects(slug) on delete set null,
  mapped_chapters text[] not null default '{}',
  source_url text not null,
  verified_at date not null default '2026-11-24',
  created_at timestamptz not null default now()
);

alter table public.official_iit_curricula enable row level security;
alter table public.official_iit_course_mappings enable row level security;

create policy "Public read official IIT curricula"
  on public.official_iit_curricula for select using (true);

create policy "Public read official IIT course mappings"
  on public.official_iit_course_mappings for select using (true);

create policy "Admins manage official IIT curricula"
  on public.official_iit_curricula for all using (public.is_admin(auth.uid()));

create policy "Admins manage official IIT course mappings"
  on public.official_iit_course_mappings for all using (public.is_admin(auth.uid()));

