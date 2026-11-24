import { Suspense } from "react";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { getAuthenticatedUserWithRole } from "@/lib/supabase/server";
import { AdminDashboardClient } from "@/components/admin/admin-dashboard";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Admin Dashboard",
};

async function AdminContent() {
  const { user, role, supabaseConfigured } = await getAuthenticatedUserWithRole();

  if (supabaseConfigured && (!user || role !== "admin")) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center space-y-4">
        <ShieldAlert className="h-12 w-12 text-red-600 mx-auto" />
        <h1 className="text-2xl font-bold text-[#0B1528]">
          Administrator Access Required
        </h1>
        <p className="text-sm text-slate-600">
          This route is protected by server-side role verification and Supabase
          Row Level Security. Sign in with an account assigned the{" "}
          <code>admin</code> role.
        </p>
        <div className="flex justify-center gap-3">
          <Button variant="primary" asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <AdminDashboardClient
      supabaseConfigured={supabaseConfigured}
      adminEmail={user?.email ?? null}
    />
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-12 text-sm text-slate-500">
          Verifying administrator session...
        </div>
      }
    >
      <AdminContent />
    </Suspense>
  );
}

