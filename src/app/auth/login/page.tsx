"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Lock, Mail, User } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type AuthMode = "login" | "signup" | "reset";

export default function AuthPage() {
  const router = useRouter();
  const configured = isSupabaseConfigured();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const supabase = createClient();
    if (!supabase) {
      setError(
        "Supabase environment variables are not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local."
      );
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        router.push("/dashboard");
        router.refresh();
      } else if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (signUpError) throw signUpError;
        setSuccessMsg(
          "Account created! Please check your email inbox for the verification link."
        );
      } else {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(
          email,
          {
            redirectTo: `${window.location.origin}/auth/callback`,
          }
        );
        if (resetError) throw resetError;
        setSuccessMsg(
          "Password recovery email sent. Follow the link in your inbox to reset your password."
        );
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      {!configured && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Supabase Not Configured:</strong> Auth forms are wired to
            Supabase Auth (`@supabase/ssr`), but `.env.local` has no project URL
            yet. Configure Supabase to enable live sign-up and email verification.
          </div>
        </div>
      )}

      <Card className="shadow-md">
        <CardHeader className="text-center">
          <Badge variant="blue" className="mx-auto mb-2">
            Student &amp; Admin Portal
          </Badge>
          <CardTitle className="text-2xl">
            {mode === "login"
              ? "Sign in to EC Vault"
              : mode === "signup"
              ? "Create your ECE account"
              : "Recover your password"}
          </CardTitle>
          <CardDescription>
            Access your purchased notes, bookmarks, and protected PDF reader.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-6 grid grid-cols-3 rounded-xl bg-slate-100 p-1 text-xs font-medium">
            {(["login", "signup", "reset"] as AuthMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setError(null);
                  setSuccessMsg(null);
                }}
                className={`rounded-lg py-2 capitalize transition-colors cursor-pointer ${
                  mode === m
                    ? "bg-white text-[#0B1528] shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {m === "reset" ? "Recovery" : m === "signup" ? "Sign Up" : "Login"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Ananya Sharma"
                    className="pl-9"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@college.ac.in"
                  className="pl-9"
                />
              </div>
            </div>

            {mode !== "reset" && (
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="pl-9"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                {error}
              </div>
            )}

            {successMsg && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800 flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Sign In"
                : mode === "signup"
                ? "Create Account"
                : "Send Recovery Link"}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            By continuing, you agree to our{" "}
            <Link href="/policies/terms" className="text-blue-600 hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/policies/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

