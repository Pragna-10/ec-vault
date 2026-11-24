import { Suspense } from "react";
import Link from "next/link";
import {
  Bookmark,
  BookOpen,
  Heart,
  Package,
  Receipt,
  Sparkles,
  User,
} from "lucide-react";
import { getAuthenticatedUserWithRole } from "@/lib/supabase/server";
import { getFreeResources } from "@/lib/curriculum-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Student Dashboard",
};

async function DashboardContent() {
  const { user, role, supabaseConfigured } = await getAuthenticatedUserWithRole();
  const freeSamples = getFreeResources().slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Badge variant="blue" className="mb-2">
            Student Workspace
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-[#0B1528]">
            Your EC Vault Dashboard
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {user
              ? `Signed in as ${user.email} (${role ?? "student"})`
              : supabaseConfigured
              ? "Sign in to sync your purchased bundles, bookmarks, and reading progress."
              : "Previewing Dashboard layout (configure Supabase Auth in .env.local for persistent user accounts)."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <form action="/api/auth/signout" method="post">
              <Button type="submit" variant="outline" size="sm">
                Sign Out
              </Button>
            </form>
          ) : (
            <Button variant="primary" size="sm" asChild>
              <Link href="/auth/login">Sign In / Sign Up</Link>
            </Button>
          )}
          <Button variant="outline" size="sm" asChild>
            <Link href="/curriculum">Browse Curriculum</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <User className="h-4 w-4 text-blue-600" />
              Profile Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-[#0B1528]">
              {user ? "Authenticated" : "Guest Preview"}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {user ? user.email : "Sign in to save university & semester"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-600" />
              Purchased Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-[#0B1528]">
              {freeSamples.length} Free Active
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Paid entitlements appear here after verified checkout
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-blue-600" />
              Bookmarks &amp; Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-[#0B1528]">Synced in Reader</div>
            <p className="text-xs text-slate-500 mt-1">
              Track last-read page across subjects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <Receipt className="h-4 w-4 text-blue-600" />
              Order History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-[#0B1528]">INR Receipts</div>
            <p className="text-xs text-slate-500 mt-1">
              Verified Razorpay transaction references
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Accessible Free Resources */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-[#0B1528] flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Available in Your Library
          </h2>
          <div className="space-y-3">
            {freeSamples.map(({ subject, resource }) => (
              <Card key={resource.id}>
                <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="emerald">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Free Access
                      </Badge>
                      <span className="text-xs text-slate-500">
                        Year {subject.yearNumber} · Sem {subject.semesterNumber}
                      </span>
                    </div>
                    <div className="font-semibold text-[#0B1528] text-sm">
                      {resource.title}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/reader/${resource.id}`}>Open Reader</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#0B1528] flex items-center gap-2">
            <Heart className="h-5 w-5 text-blue-600" />
            Wishlist &amp; Quick Actions
          </h2>
          <Card>
            <CardContent className="p-5 space-y-3 text-sm text-slate-600">
              <p>
                Save subjects to your wishlist from any subject detail page, or
                unlock a complete semester bundle for ₹99.
              </p>
              <Button variant="primary" size="sm" className="w-full" asChild>
                <Link href="/pricing">Explore Semester &amp; Year Bundles</Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/contact?kind=subject_request">
                  Request a New Subject
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-12 text-sm text-slate-500">
          Loading student dashboard...
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}

