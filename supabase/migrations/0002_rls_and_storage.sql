-- EC Vault Row Level Security (RLS) & Storage Policies

-- Helper function to check admin role
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    join public.roles r on r.id = p.role_id
    where p.id = uid and r.name = 'admin'
  );
$$;

-- Enable RLS on all tables
alter table public.roles enable row level security;
alter table public.profiles enable row level security;
alter table public.universities enable row level security;
alter table public.programmes enable row level security;
alter table public.curriculum_versions enable row level security;
alter table public.semesters enable row level security;
alter table public.subjects enable row level security;
alter table public.curriculum_mappings enable row level security;
alter table public.chapters enable row level security;
alter table public.topics enable row level security;
alter table public.resources enable row level security;
alter table public.resource_previews enable row level security;
alter table public.products enable row level security;
alter table public.bundles enable row level security;
alter table public.bundle_items enable row level security;
alter table public.coupons enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.entitlements enable row level security;
alter table public.bookmarks enable row level security;
alter table public.reviews enable row level security;
alter table public.feedback_submissions enable row level security;

-- Public read access for published catalog tables
create policy "Public read semesters" on public.semesters for select using (true);
create policy "Public read published subjects" on public.subjects for select using (is_published = true or public.is_admin(auth.uid()));
create policy "Public read chapters" on public.chapters for select using (true);
create policy "Public read topics" on public.topics for select using (true);
create policy "Public read published resources" on public.resources for select using (is_published = true or public.is_admin(auth.uid()));
create policy "Public read resource previews" on public.resource_previews for select using (true);
create policy "Public read active products" on public.products for select using (is_active = true or public.is_admin(auth.uid()));
create policy "Public read bundles" on public.bundles for select using (true);
create policy "Public read bundle items" on public.bundle_items for select using (true);
create policy "Public read universities" on public.universities for select using (true);
create policy "Public read programmes" on public.programmes for select using (true);
create policy "Public read curriculum versions" on public.curriculum_versions for select using (true);
create policy "Public read curriculum mappings" on public.curriculum_mappings for select using (true);
create policy "Public read approved reviews" on public.reviews for select using (is_approved = true or auth.uid() = user_id or public.is_admin(auth.uid()));

-- User-owned tables
create policy "Users view own profile" on public.profiles for select using (auth.uid() = id or public.is_admin(auth.uid()));
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "Users view own orders" on public.orders for select using (auth.uid() = user_id or public.is_admin(auth.uid()));
create policy "Users view own order items" on public.order_items for select using (
  exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or public.is_admin(auth.uid())))
);
create policy "Users view own payments" on public.payments for select using (
  exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or public.is_admin(auth.uid())))
);
create policy "Users view own entitlements" on public.entitlements for select using (auth.uid() = user_id or public.is_admin(auth.uid()));

create policy "Users manage own bookmarks" on public.bookmarks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users insert own reviews" on public.reviews for insert with check (auth.uid() = user_id);
create policy "Anyone can submit feedback" on public.feedback_submissions for insert with check (true);
create policy "Users view own feedback" on public.feedback_submissions for select using (auth.uid() = user_id or public.is_admin(auth.uid()));

-- Admin full access policies
create policy "Admins manage roles" on public.roles for all using (public.is_admin(auth.uid()));
create policy "Admins manage profiles" on public.profiles for all using (public.is_admin(auth.uid()));
create policy "Admins manage universities" on public.universities for all using (public.is_admin(auth.uid()));
create policy "Admins manage programmes" on public.programmes for all using (public.is_admin(auth.uid()));
create policy "Admins manage curriculum versions" on public.curriculum_versions for all using (public.is_admin(auth.uid()));
create policy "Admins manage semesters" on public.semesters for all using (public.is_admin(auth.uid()));
create policy "Admins manage subjects" on public.subjects for all using (public.is_admin(auth.uid()));
create policy "Admins manage curriculum mappings" on public.curriculum_mappings for all using (public.is_admin(auth.uid()));
create policy "Admins manage chapters" on public.chapters for all using (public.is_admin(auth.uid()));
create policy "Admins manage topics" on public.topics for all using (public.is_admin(auth.uid()));
create policy "Admins manage resources" on public.resources for all using (public.is_admin(auth.uid()));
create policy "Admins manage resource previews" on public.resource_previews for all using (public.is_admin(auth.uid()));
create policy "Admins manage products" on public.products for all using (public.is_admin(auth.uid()));
create policy "Admins manage bundles" on public.bundles for all using (public.is_admin(auth.uid()));
create policy "Admins manage bundle items" on public.bundle_items for all using (public.is_admin(auth.uid()));
create policy "Admins manage coupons" on public.coupons for all using (public.is_admin(auth.uid()));
create policy "Admins manage orders" on public.orders for all using (public.is_admin(auth.uid()));
create policy "Admins manage order items" on public.order_items for all using (public.is_admin(auth.uid()));
create policy "Admins manage payments" on public.payments for all using (public.is_admin(auth.uid()));
create policy "Admins manage entitlements" on public.entitlements for all using (public.is_admin(auth.uid()));
create policy "Admins manage reviews" on public.reviews for all using (public.is_admin(auth.uid()));
create policy "Admins manage feedback" on public.feedback_submissions for all using (public.is_admin(auth.uid()));

-- Storage buckets (private for protected PDFs, public for preview images)
insert into storage.buckets (id, name, public)
values ('ec-vault-pdfs', 'ec-vault-pdfs', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('ec-vault-previews', 'ec-vault-previews', true)
on conflict (id) do nothing;

-- Storage policies: only admins can upload/delete PDFs; signed URLs via service role handle authenticated reads
create policy "Admins upload PDFs"
  on storage.objects for insert
  with check (bucket_id = 'ec-vault-pdfs' and public.is_admin(auth.uid()));

create policy "Admins update PDFs"
  on storage.objects for update
  using (bucket_id = 'ec-vault-pdfs' and public.is_admin(auth.uid()));

create policy "Admins delete PDFs"
  on storage.objects for delete
  using (bucket_id = 'ec-vault-pdfs' and public.is_admin(auth.uid()));

create policy "Public read previews"
  on storage.objects for select
  using (bucket_id = 'ec-vault-previews');

create policy "Admins upload previews"
  on storage.objects for insert
  with check (bucket_id = 'ec-vault-previews' and public.is_admin(auth.uid()));

